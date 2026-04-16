#!/usr/bin/env python3
"""
generate_variants.py — Auto-generate minigen image variants 2 and 3 from variant 1.

Usage:
    python generate_variants.py [directory]

If no directory is given, scans the current folder.
Finds all files matching *-1.png, generates *-2.png and *-3.png alongside them.

Requirements:
    pip install Pillow

Variant 2 (*-2.png):
    - Pixelation: downscale to 16px → upscale back (8px blocks)
    - Chromatic aberration: R channel +2px right
    - 40% desaturation (blended with greyscale)

Variant 3 (*-3.png):
    - Pixelation: downscale to 8px → upscale back (16px blocks, more extreme)
    - Random horizontal slice glitches
    - R channel +6px, B channel -6px chromatic aberration
    - 85% desaturation (near-grayscale)
"""

import sys
import random
from pathlib import Path
from PIL import Image


def desaturate(img: Image.Image, amount: float) -> Image.Image:
    """Blend img with its greyscale copy. amount=0.0 = original, 1.0 = full grey."""
    grey = img.convert("L").convert("RGBA")
    # preserve original alpha
    alpha = img.split()[3]
    blended = Image.blend(img.convert("RGBA"), grey, amount)
    blended.putalpha(alpha)
    return blended


def chromatic_aberration(img: Image.Image, shift_r: int, shift_b: int) -> Image.Image:
    """
    Shift R channel right by shift_r px and B channel left by shift_b px.
    Edges wrap around for a proper glitch look.
    """
    r, g, b, a = img.split()
    w = img.width

    def shift_wrap(ch: Image.Image, dx: int) -> Image.Image:
        if dx == 0:
            return ch
        out = Image.new("L", ch.size, 0)
        if dx > 0:
            out.paste(ch.crop((0, 0, w - dx, ch.height)), (dx, 0))
            out.paste(ch.crop((w - dx, 0, w, ch.height)), (0, 0))
        else:
            dx = -dx
            out.paste(ch.crop((dx, 0, w, ch.height)), (0, 0))
            out.paste(ch.crop((0, 0, dx, ch.height)), (w - dx, 0))
        return out

    r2 = shift_wrap(r, shift_r)
    b2 = shift_wrap(b, -shift_b)
    return Image.merge("RGBA", (r2, g, b2, a))


def pixelate(img: Image.Image, mid_size: int) -> Image.Image:
    """
    Downscale to mid_size × mid_size, then upscale back to original size using
    nearest-neighbour to create a blocky pixelated look.
    """
    w, h = img.size
    small = img.resize((mid_size, mid_size), Image.NEAREST)
    return small.resize((w, h), Image.NEAREST)


def glitch_slices(
    img: Image.Image,
    num_slices: int = 6,
    max_height: int = 8,
    max_offset: int = 8,
) -> Image.Image:
    """
    Randomly shift horizontal slices of the image to simulate a glitch artifact.
    Edges wrap around within the slice.
    """
    result = img.copy()
    w, h = img.size
    for _ in range(num_slices):
        y = random.randint(0, h - 1)
        sh = random.randint(1, max(1, max_height))
        y2 = min(y + sh, h)
        offset = random.randint(-max_offset, max_offset)
        if offset == 0:
            continue
        row = img.crop((0, y, w, y2))
        row_h = y2 - y
        temp = Image.new("RGBA", (w, row_h), (0, 0, 0, 0))
        if offset > 0:
            temp.paste(row.crop((0, 0, w - offset, row_h)), (offset, 0))
            temp.paste(row.crop((w - offset, 0, w, row_h)), (0, 0))
        else:
            o = -offset
            temp.paste(row.crop((o, 0, w, row_h)), (0, 0))
            temp.paste(row.crop((0, 0, o, row_h)), (w - o, 0))
        result.paste(temp, (0, y))
    return result


def make_variant2(src: Image.Image) -> Image.Image:
    img = src.convert("RGBA")
    # 8px blocks: downscale to 16px intermediate → upscale to 128px
    img = pixelate(img, 16)
    # Subtle chromatic aberration: R shifted +2px right
    img = chromatic_aberration(img, shift_r=2, shift_b=0)
    # 40% desaturation
    img = desaturate(img, 0.4)
    return img


def make_variant3(src: Image.Image) -> Image.Image:
    img = src.convert("RGBA")
    # 16px blocks (more extreme): downscale to 8px intermediate → upscale to 128px
    img = pixelate(img, 8)
    # Random horizontal glitch slices
    img = glitch_slices(img, num_slices=6, max_height=8, max_offset=8)
    # Heavy chromatic aberration: R +6px, B -6px
    img = chromatic_aberration(img, shift_r=6, shift_b=6)
    # 85% desaturation (near-grayscale)
    img = desaturate(img, 0.85)
    return img


def process_file(path: Path) -> None:
    stem = path.stem           # e.g. "minigen-cat-1"
    base = stem[:-2]           # strip "-1"  →  "minigen-cat"

    out2 = path.parent / f"{base}-2.png"
    out3 = path.parent / f"{base}-3.png"

    src = Image.open(path)

    v2 = make_variant2(src)
    v2.save(out2)
    print(f"  ✓ {out2.name}")

    v3 = make_variant3(src)
    v3.save(out3)
    print(f"  ✓ {out3.name}")


def main() -> None:
    folder = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(".")
    sources = sorted(folder.glob("*-1.png"))

    if not sources:
        print(f"No *-1.png files found in: {folder.resolve()}")
        return

    print(f"Found {len(sources)} source file(s) in {folder.resolve()}\n")
    for p in sources:
        print(f"→ {p.name}")
        process_file(p)

    print("\nAll done!")


if __name__ == "__main__":
    main()
