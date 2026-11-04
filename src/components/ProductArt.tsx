import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  /** Color de la prenda; por defecto el primero del producto. */
  colorHex?: string;
  className?: string;
};

/**
 * Mockup vectorial de cada producto (prenda + diseño pintado).
 *
 * Es un sustituto hasta tener los mockups reales de Printful: no pesa nada,
 * se ve nítido a cualquier tamaño y cambia de color al instante.
 */
export function ProductArt({ product, colorHex, className }: Props) {
  const garment = colorHex ?? product.colors[0].hex;
  const ink = isDark(garment) ? "#f4f1ea" : "#111114";
  const id = `art-${product.slug}`;

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={`${product.name} en color ${nameForHex(product, garment)}`}
      className={className}
    >
      <defs>
        <filter id={`${id}-rough`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
        <radialGradient id={`${id}-shade`} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      <Garment kind={product.kind} fill={garment} shadeId={`${id}-shade`} />
      <Print product={product} ink={ink} filterId={`${id}-rough`} />
    </svg>
  );
}

function Garment({
  kind,
  fill,
  shadeId,
}: {
  kind: Product["kind"];
  fill: string;
  shadeId: string;
}) {
  const stroke = "#000";
  switch (kind) {
    case "tee":
      return (
        <g stroke={stroke} strokeWidth="4" strokeLinejoin="round">
          <path
            d="M140 52 L96 66 L34 120 L70 168 L104 144 L104 352 L296 352 L296 144 L330 168 L366 120 L304 66 L260 52 C250 78 228 90 200 90 C172 90 150 78 140 52 Z"
            fill={fill}
          />
          <path
            d="M140 52 L96 66 L34 120 L70 168 L104 144 L104 352 L296 352 L296 144 L330 168 L366 120 L304 66 L260 52 C250 78 228 90 200 90 C172 90 150 78 140 52 Z"
            fill={`url(#${shadeId})`}
            stroke="none"
          />
          <path d="M140 52 C150 78 172 90 200 90 C228 90 250 78 260 52" fill="none" />
        </g>
      );
    case "hoodie":
      return (
        <g stroke={stroke} strokeWidth="4" strokeLinejoin="round">
          <path
            d="M130 70 L88 84 L40 170 L42 330 L84 334 L104 190 L104 360 L296 360 L296 190 L316 334 L358 330 L360 170 L312 84 L270 70 C270 40 240 22 200 22 C160 22 130 40 130 70 Z"
            fill={fill}
          />
          <path
            d="M130 70 L88 84 L40 170 L42 330 L84 334 L104 190 L104 360 L296 360 L296 190 L316 334 L358 330 L360 170 L312 84 L270 70 C270 40 240 22 200 22 C160 22 130 40 130 70 Z"
            fill={`url(#${shadeId})`}
            stroke="none"
          />
          <path d="M150 74 C160 104 240 104 250 74" fill="none" />
          <path d="M184 100 L180 150 M216 100 L220 150" fill="none" strokeWidth="3" />
          <path d="M138 286 L262 286 L276 340 L124 340 Z" fill="none" strokeWidth="3" />
        </g>
      );
    case "cap":
      return (
        <g stroke={stroke} strokeWidth="4" strokeLinejoin="round">
          <path d="M70 250 C70 130 130 80 200 80 C270 80 330 130 330 250 Z" fill={fill} />
          <path
            d="M70 250 C70 130 130 80 200 80 C270 80 330 130 330 250 Z"
            fill={`url(#${shadeId})`}
            stroke="none"
          />
          <path d="M40 252 C110 232 290 232 360 252 C350 300 50 300 40 252 Z" fill={fill} />
          <path d="M200 80 L200 250" fill="none" strokeWidth="2" opacity="0.5" />
          <circle cx="200" cy="80" r="9" fill={fill} />
        </g>
      );
    case "sticker":
      return (
        <g transform="rotate(-8 200 200)">
          <path
            d="M70 110 C90 60 170 50 220 64 C290 50 350 90 340 160 C370 220 330 300 260 312 C210 350 120 340 90 290 C40 260 40 160 70 110 Z"
            fill="#f4f1ea"
            stroke="#000"
            strokeWidth="4"
          />
          <path
            d="M88 120 C104 80 170 72 218 84 C280 72 326 104 318 160 C344 214 312 282 254 292 C210 324 132 316 106 274 C66 248 66 164 88 120 Z"
            fill="#111114"
          />
        </g>
      );
    case "mug":
      return (
        <g stroke={stroke} strokeWidth="4" strokeLinejoin="round">
          <path d="M300 150 C370 150 370 270 300 270" fill="none" strokeWidth="22" />
          <path d="M300 150 C370 150 370 270 300 270" fill="none" stroke={fill} strokeWidth="14" />
          <path d="M80 100 L80 320 C80 345 320 345 320 320 L320 100 Z" fill={fill} />
          <path
            d="M80 100 L80 320 C80 345 320 345 320 320 L320 100 Z"
            fill={`url(#${shadeId})`}
            stroke="none"
          />
          <ellipse cx="200" cy="100" rx="120" ry="20" fill="#2a2a2e" />
        </g>
      );
  }
}

function Print({
  product,
  ink,
  filterId,
}: {
  product: Product;
  ink: string;
  filterId: string;
}) {
  const [main, splash, shadow] = product.palette;
  const center = PRINT_CENTER[product.kind];
  const text = product.artText;
  const fontSize = Math.min(center.width / (text.length * 0.62), center.maxFont);

  return (
    <g transform={`translate(${center.x} ${center.y}) rotate(${center.rotate})`}>
      {/* Mancha de spray de fondo */}
      <g filter={`url(#${filterId})`} opacity="0.9">
        <ellipse cx="0" cy="0" rx={center.width * 0.55} ry={fontSize * 0.75} fill={splash} />
        <circle cx={center.width * 0.42} cy={-fontSize * 0.5} r={fontSize * 0.18} fill={splash} />
        <circle cx={-center.width * 0.48} cy={fontSize * 0.45} r={fontSize * 0.12} fill={splash} />
      </g>

      {/* Goteos */}
      {[-0.32, -0.08, 0.2, 0.36].map((offset, i) => (
        <rect
          key={offset}
          x={center.width * offset}
          y={fontSize * 0.2}
          width={5 + (i % 2) * 3}
          height={fontSize * (0.55 + (i % 3) * 0.25)}
          rx="4"
          fill={main}
        />
      ))}

      {/* Sombra 3D + contorno + relleno: el clásico throw-up */}
      <text
        x="6"
        y="8"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fill={shadow}
        stroke="#000"
        strokeWidth="8"
        paintOrder="stroke"
        style={{ fontFamily: "var(--ff-graffiti)" }}
      >
        {text}
      </text>
      <text
        x="0"
        y="0"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fill={main}
        stroke="#000"
        strokeWidth="6"
        paintOrder="stroke"
        style={{ fontFamily: "var(--ff-graffiti)" }}
      >
        {text}
      </text>

      {/* Firma pequeña */}
      <text
        x={center.width * 0.42}
        y={fontSize * 0.95}
        textAnchor="end"
        fontSize={Math.max(fontSize * 0.2, 11)}
        fill={ink}
        style={{ fontFamily: "var(--ff-marker)" }}
      >
        breakbeat
      </text>
    </g>
  );
}

const PRINT_CENTER: Record<
  Product["kind"],
  { x: number; y: number; width: number; maxFont: number; rotate: number }
> = {
  tee: { x: 200, y: 200, width: 170, maxFont: 78, rotate: -6 },
  hoodie: { x: 200, y: 200, width: 170, maxFont: 72, rotate: -6 },
  cap: { x: 200, y: 175, width: 150, maxFont: 72, rotate: -4 },
  sticker: { x: 200, y: 196, width: 210, maxFont: 92, rotate: -14 },
  mug: { x: 200, y: 215, width: 190, maxFont: 72, rotate: -6 },
};

function isDark(hex: string): boolean {
  const value = Number.parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

function nameForHex(product: Product, hex: string): string {
  return product.colors.find((color) => color.hex === hex)?.name ?? hex;
}
