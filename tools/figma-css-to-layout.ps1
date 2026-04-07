param(
    [string]$InputPath = "design-pipeline/figma-export.raw.css",
    [string]$OutputPath = "design-pipeline/layout-overrides.generated.js"
)

if (-not (Test-Path $InputPath)) {
    Write-Error "Input file not found: $InputPath"
    exit 1
}

$raw = Get-Content $InputPath -Raw

$allowed = @(
    'left','right','top','bottom',
    'width','height','min-width','max-width','min-height','max-height',
    'transform','z-index','display','opacity',
    'font-size','font-weight','line-height','letter-spacing','text-align'
)

function ToCamel([string]$k) {
    $parts = $k.Split('-')
    if ($parts.Count -le 1) { return $k }
    $head = $parts[0]
    $tail = $parts[1..($parts.Count-1)] | ForEach-Object {
        if ($_.Length -eq 0) { return $_ }
        return ($_.Substring(0,1).ToUpper() + $_.Substring(1))
    }
    return ($head + ($tail -join ''))
}

$rules = @{}
$blockRegex = [regex]'(?ms)([^{}]+)\{([^{}]+)\}'
$declRegex = [regex]'(?m)^\s*([a-zA-Z-]+)\s*:\s*([^;]+);\s*$'

foreach ($m in $blockRegex.Matches($raw)) {
    $selector = $m.Groups[1].Value.Trim()
    $body = $m.Groups[2].Value

    if ([string]::IsNullOrWhiteSpace($selector)) { continue }

    $style = @{}
    foreach ($d in $declRegex.Matches($body)) {
        $keyRaw = $d.Groups[1].Value.Trim().ToLower()
        $value = $d.Groups[2].Value.Trim()
        if ($allowed -notcontains $keyRaw) { continue }
        $style[(ToCamel $keyRaw)] = $value
    }

    if ($style.Count -gt 0) {
        $rules[$selector] = $style
    }
}

$lines = @()
$lines += "window.LAYOUT_OVERRIDES = {"
$lines += "    enabled: true,"
$lines += "    cssVariables: {},"
$lines += "    elements: {"

$selectors = $rules.Keys | Sort-Object
for ($i = 0; $i -lt $selectors.Count; $i++) {
    $sel = $selectors[$i]
    $lines += "        '$sel': {"

    $keys = $rules[$sel].Keys | Sort-Object
    for ($j = 0; $j -lt $keys.Count; $j++) {
        $k = $keys[$j]
        $v = $rules[$sel][$k].Replace("'", "\\'")
        $comma = if ($j -lt $keys.Count - 1) { "," } else { "" }
        $lines += "            $k`: '$v'$comma"
    }

    $commaSel = if ($i -lt $selectors.Count - 1) { "," } else { "" }
    $lines += "        }$commaSel"
}

$lines += "    }"
$lines += "};"

Set-Content -Path $OutputPath -Value ($lines -join [Environment]::NewLine) -Encoding UTF8
Write-Host "Generated: $OutputPath"
