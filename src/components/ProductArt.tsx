import type { ReactNode } from "react";
import Image from "next/image";
import type { Art, Product, ProductKind } from "@/lib/products";

type Props = {
  product: Product;
  /** Color del producto; por defecto el primero. Con leopardo es el fondo del estampado. */
  colorHex?: string;
  className?: string;
  preload?: boolean;
};

/**
 * Mockup vectorial de cada producto: la prenda (o lona, bandera…) y su diseño.
 *
 * Es un sustituto hasta tener los mockups reales del proveedor de impresión:
 * no pesa nada, se ve nítido a cualquier tamaño y cambia de color al instante.
 *
 * Ingredientes del diseño (ver `Art` en lib/products):
 * tag tipo throw-up u oso asesino · estampado de leopardo · llamas · brillos.
 * Los productos «discretos» llevan el diseño pequeño, sin llamas.
 */
export function ProductArt({ product, colorHex, className, preload = false }: Props) {
  const base = colorHex ?? product.colors[0].hex;
  if (product.image) {
    return (
      <Image
        src={product.image.src}
        width={product.image.width}
        height={product.image.height}
        alt={`${product.name}, ${nameForHex(product, base)}`}
        sizes="(min-width: 1024px) 576px, (min-width: 768px) 50vw, 100vw"
        className={className}
        preload={preload}
      />
    );
  }
  const id = `art-${product.slug}`;
  const shape = SHAPES[product.kind];
  const { art } = product;
  const mortal = product.level === "mortal";
  const fill = art.pattern === "leopard" ? `url(#${id}-leo)` : base;

  return (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label={`${product.name}, ${nameForHex(product, base)}`}
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
        <clipPath id={`${id}-clip`}>
          <path d={shape.outline} />
        </clipPath>
        {art.pattern === "leopard" && <LeopardPattern id={`${id}-leo`} base={base} />}
        {product.kind === "lanyard" && <path id={`${id}-strap`} d={LANYARD_PATH} />}
      </defs>

      {shape.back?.(fill)}
      {!shape.decorOnly && (
        <>
          <path
            d={shape.outline}
            fill={fill}
            stroke="#000"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <g clipPath={`url(#${id}-clip)`}>
            {art.flames && mortal && shape.flames && <Flames {...shape.flames} />}
            <path d={shape.outline} fill={`url(#${id}-shade)`} />
          </g>
        </>
      )}

      {shape.front?.(fill)}

      {product.kind === "lanyard" ? (
        <LanyardText art={art} pathId={`${id}-strap`} />
      ) : (
        <Design
          art={art}
          spot={mortal ? shape.print : (shape.small ?? shape.print)}
          small={!mortal}
          inkDark={!isDark(base) || art.pattern === "leopard"}
          filterId={`${id}-rough`}
        />
      )}
    </svg>
  );
}

/* ───────────────────────────── Formas ───────────────────────────── */

type Spot = { x: number; y: number; width: number; maxFont: number; rotate: number };

type Shape = {
  /** Silueta principal (relleno, contorno y recorte de llamas/sombra). */
  outline: string;
  /** La forma se dibuja entera en back/front (lanyard): no pintar `outline`. */
  decorOnly?: boolean;
  /** Piezas detrás de la silueta (asa, mástil…). */
  back?: (fill: string) => ReactNode;
  /** Detalles encima (costuras, bolsillo, ollaos…). */
  front?: (fill: string) => ReactNode;
  /** Zona de estampado grande (mortal). */
  print: Spot;
  /** Zona de estampado pequeño (discreto). */
  small?: Spot;
  /** Dónde nacen las llamas y cuánto suben. */
  flames?: { baseline: number; height: number };
};

const TEE =
  "M140 52 L96 66 L34 120 L70 168 L104 144 L104 352 L296 352 L296 144 L330 168 L366 120 L304 66 L260 52 C250 78 228 90 200 90 C172 90 150 78 140 52 Z";
const HOODIE =
  "M130 70 L88 84 L40 170 L42 330 L84 334 L104 190 L104 360 L296 360 L296 190 L316 334 L358 330 L360 170 L312 84 L270 70 C270 40 240 22 200 22 C160 22 130 40 130 70 Z";
const PANTS = "M118 36 L282 36 L300 356 L218 362 L200 150 L182 362 L100 356 Z";
const CAP = "M70 250 C70 130 130 80 200 80 C270 80 330 130 330 250 Z";
const STICKER =
  "M70 110 C90 60 170 50 220 64 C290 50 350 90 340 160 C370 220 330 300 260 312 C210 350 120 340 90 290 C40 260 40 160 70 110 Z";
const BANNER = "M30 110 L370 110 L370 300 L30 300 Z";
const FLAG = "M76 56 C150 30 230 86 352 56 L352 262 C230 292 150 236 76 262 Z";
const LANYARD_PATH = "M112 10 C112 200 160 290 200 318 C240 290 288 200 288 10";

const line = { fill: "none", stroke: "#000", strokeWidth: 3 } as const;

const SHAPES: Record<ProductKind, Shape> = {
  tee: {
    outline: TEE,
    front: () => (
      <path d="M140 52 C150 78 172 90 200 90 C228 90 250 78 260 52" {...line} strokeWidth={4} />
    ),
    print: { x: 200, y: 205, width: 170, maxFont: 78, rotate: -6 },
    small: { x: 246, y: 140, width: 62, maxFont: 28, rotate: -4 },
    flames: { baseline: 356, height: 150 },
  },
  hoodie: {
    outline: HOODIE,
    front: () => (
      <>
        <path d="M150 74 C160 104 240 104 250 74" {...line} strokeWidth={4} />
        <path d="M184 100 L180 150 M216 100 L220 150" {...line} />
        <path d="M138 286 L262 286 L276 340 L124 340 Z" {...line} />
      </>
    ),
    print: { x: 200, y: 205, width: 170, maxFont: 72, rotate: -6 },
    small: { x: 248, y: 160, width: 60, maxFont: 26, rotate: -4 },
    flames: { baseline: 364, height: 170 },
  },
  pants: {
    outline: PANTS,
    front: () => (
      <>
        <path d="M118 36 L282 36 L283 58 L117 58 Z" fill="#111114" stroke="#000" strokeWidth={3} />
        <path d="M188 58 L184 84 M212 58 L216 84" {...line} stroke="#f4f1ea" />
        <path d="M100 340 L182 344 M218 344 L300 340" {...line} />
        <path d="M200 58 L200 150" {...line} strokeWidth={2} />
      </>
    ),
    print: { x: 150, y: 120, width: 70, maxFont: 34, rotate: -8 },
    flames: { baseline: 366, height: 230 },
  },
  cap: {
    outline: CAP,
    back: (fill) => (
      <path
        d="M40 252 C110 232 290 232 360 252 C350 300 50 300 40 252 Z"
        fill={fill}
        stroke="#000"
        strokeWidth={4}
      />
    ),
    front: (fill) => (
      <>
        <path d="M200 80 L200 250" {...line} strokeWidth={2} opacity={0.5} />
        <circle cx="200" cy="80" r="9" fill={fill} stroke="#000" strokeWidth={4} />
      </>
    ),
    print: { x: 200, y: 175, width: 150, maxFont: 66, rotate: -4 },
    small: { x: 200, y: 185, width: 100, maxFont: 30, rotate: -3 },
  },
  sticker: {
    outline: STICKER,
    front: () => (
      <path
        d="M88 120 C104 80 170 72 218 84 C280 72 326 104 318 160 C344 214 312 282 254 292 C210 324 132 316 106 274 C66 248 66 164 88 120 Z"
        fill="#111114"
      />
    ),
    print: { x: 202, y: 192, width: 200, maxFont: 92, rotate: -10 },
  },
  lanyard: {
    outline: LANYARD_PATH,
    decorOnly: true,
    back: (fill) => (
      <>
        <path d={LANYARD_PATH} fill="none" stroke="#000" strokeWidth={44} strokeLinecap="round" />
        <path d={LANYARD_PATH} fill="none" stroke={fill} strokeWidth={36} strokeLinecap="round" />
      </>
    ),
    front: () => (
      <>
        <rect
          x="186"
          y="300"
          width="28"
          height="22"
          rx="4"
          fill="#b8b8c0"
          stroke="#000"
          strokeWidth={3}
        />
        <circle cx="200" cy="336" r="14" fill="none" stroke="#000" strokeWidth={9} />
        <circle cx="200" cy="336" r="14" fill="none" stroke="#c9c9d1" strokeWidth={5} />
        <path
          d="M200 350 L200 372 C200 386 214 386 214 374"
          fill="none"
          stroke="#000"
          strokeWidth={8}
          strokeLinecap="round"
        />
        <path
          d="M200 350 L200 372 C200 386 214 386 214 374"
          fill="none"
          stroke="#c9c9d1"
          strokeWidth={4}
          strokeLinecap="round"
        />
      </>
    ),
    print: { x: 200, y: 200, width: 100, maxFont: 30, rotate: 0 },
  },
  banner: {
    outline: BANNER,
    back: () => (
      <path d="M30 110 L60 40 M370 110 L340 40" {...line} strokeWidth={3} strokeDasharray="6 4" />
    ),
    front: () => (
      <>
        {[
          [44, 124],
          [356, 124],
          [44, 286],
          [356, 286],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="7"
            fill="#c9c9d1"
            stroke="#000"
            strokeWidth={3}
          />
        ))}
      </>
    ),
    print: { x: 200, y: 200, width: 250, maxFont: 72, rotate: -4 },
    flames: { baseline: 304, height: 90 },
  },
  flag: {
    outline: FLAG,
    back: () => (
      <>
        <rect
          x="62"
          y="30"
          width="12"
          height="360"
          rx="4"
          fill="#9a9aa3"
          stroke="#000"
          strokeWidth={3}
        />
        <circle cx="68" cy="28" r="12" fill="#ffd23f" stroke="#000" strokeWidth={3} />
      </>
    ),
    print: { x: 214, y: 140, width: 150, maxFont: 64, rotate: -4 },
    flames: { baseline: 296, height: 110 },
  },
};

/* ───────────────────────────── Diseño ───────────────────────────── */

function Design({
  art,
  spot,
  small,
  inkDark,
  filterId,
}: {
  art: Art;
  spot: Spot;
  small: boolean;
  inkDark: boolean;
  filterId: string;
}) {
  return (
    <g transform={`translate(${spot.x} ${spot.y}) rotate(${spot.rotate})`}>
      {art.motif === "bear" ? (
        <Bear art={art} width={spot.width} small={small} />
      ) : (
        <Tag art={art} spot={spot} small={small} inkDark={inkDark} filterId={filterId} />
      )}
      {art.glitter && <Glitter width={spot.width} small={small} />}
    </g>
  );
}

function Tag({
  art,
  spot,
  small,
  inkDark,
  filterId,
}: {
  art: Art;
  spot: Spot;
  small: boolean;
  inkDark: boolean;
  filterId: string;
}) {
  const [main, splash, shadow] = art.palette;
  const text = art.text ?? "BB";
  const fontSize = Math.min(spot.width / (text.length * 0.62), spot.maxFont);
  const stroke = small ? 4 : 6;

  return (
    <>
      {!small && (
        <>
          <g filter={`url(#${filterId})`} opacity="0.9">
            <ellipse cx="0" cy="0" rx={spot.width * 0.55} ry={fontSize * 0.75} fill={splash} />
            <circle cx={spot.width * 0.42} cy={-fontSize * 0.5} r={fontSize * 0.18} fill={splash} />
            <circle
              cx={-spot.width * 0.48}
              cy={fontSize * 0.45}
              r={fontSize * 0.12}
              fill={splash}
            />
          </g>
          {[-0.32, -0.08, 0.2, 0.36].map((offset, i) => (
            <rect
              key={offset}
              x={spot.width * offset}
              y={fontSize * 0.2}
              width={5 + (i % 2) * 3}
              height={fontSize * (0.55 + (i % 3) * 0.25)}
              rx="4"
              fill={main}
            />
          ))}
        </>
      )}
      <text
        x={small ? 3 : 6}
        y={small ? 3 : 8}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fill={shadow}
        stroke="#000"
        strokeWidth={stroke + 2}
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
        strokeWidth={stroke}
        paintOrder="stroke"
        style={{ fontFamily: "var(--ff-graffiti)" }}
      >
        {text}
      </text>
      {!small && (
        <text
          x={spot.width * 0.42}
          y={fontSize * 0.95}
          textAnchor="end"
          fontSize={Math.max(fontSize * 0.2, 11)}
          fill={inkDark ? "#111114" : "#f4f1ea"}
          style={{ fontFamily: "var(--ff-marker)" }}
        >
          breakbeat
        </text>
      )}
    </>
  );
}

/** El oso asesino: ojos rojos, ceño, dientes, cicatriz y cadena de oro. */
function Bear({ art, width, small }: { art: Art; width: number; small: boolean }) {
  const [eyes, , gold] = art.palette;
  const fur = art.palette[0] === "#ffd23f" ? "#ffd23f" : "#7a4a26";
  const furDark = fur === "#ffd23f" ? "#c99a12" : "#4e2c14";
  const showText = !small && art.text;
  const scale = width / (showText ? 250 : 220);

  return (
    <g transform={`scale(${scale}) translate(0 ${showText ? -18 : 0})`}>
      {/* Orejas */}
      {[-1, 1].map((side) => (
        <g key={side}>
          <circle cx={side * 58} cy={-62} r={30} fill={fur} stroke="#000" strokeWidth={5} />
          <circle cx={side * 58} cy={-62} r={14} fill={furDark} />
        </g>
      ))}
      {/* Cabeza */}
      <ellipse cx="0" cy="0" rx="86" ry="76" fill={fur} stroke="#000" strokeWidth={5} />
      {/* Hocico */}
      <ellipse cx="0" cy="26" rx="42" ry="30" fill="#e2c29b" stroke="#000" strokeWidth={4} />
      <path d="M-13 6 Q0 -2 13 6 Q8 20 0 22 Q-8 20 -13 6 Z" fill="#111" />
      {/* Boca con dientes */}
      <path d="M-30 32 Q0 70 30 32 Z" fill="#111" stroke="#000" strokeWidth={3} />
      <path
        d="M-28 33 L-22 44 L-16 34 L-10 47 L-4 35 L2 48 L8 35 L14 46 L20 34 L25 43 L28 33 Z"
        fill="#fff"
      />
      {/* Ceño */}
      <path d="M-62 -36 L-16 -16" stroke="#000" strokeWidth={10} strokeLinecap="round" />
      <path d="M62 -36 L16 -16" stroke="#000" strokeWidth={10} strokeLinecap="round" />
      {/* Ojos */}
      {[-1, 1].map((side) => (
        <g key={side}>
          <circle cx={side * 34} cy={-6} r={12} fill={eyes} stroke="#000" strokeWidth={3} />
          <circle cx={side * 34 - 3} cy={-9} r={3.5} fill="#fff" />
        </g>
      ))}
      {/* Cicatriz */}
      <path d="M48 -40 L26 18" stroke="#000" strokeWidth={4} strokeLinecap="round" />
      {[-26, -12, 2].map((y, i) => (
        <path
          key={y}
          d={`M${30 + i * -3} ${y} l12 4`}
          stroke="#000"
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}
      {/* Cadena de oro */}
      {!small && (
        <g>
          {Array.from({ length: 11 }, (_, i) => {
            const t = i / 10;
            const x = -64 + t * 128;
            const y = 72 + Math.sin(t * Math.PI) * 22;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="9"
                ry="6"
                fill="none"
                stroke="#000"
                strokeWidth={7}
              />
            );
          })}
          {Array.from({ length: 11 }, (_, i) => {
            const t = i / 10;
            const x = -64 + t * 128;
            const y = 72 + Math.sin(t * Math.PI) * 22;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="9"
                ry="6"
                fill="none"
                stroke={gold}
                strokeWidth={4}
              />
            );
          })}
          <path
            d="M0 100 L8 116 L26 118 L12 130 L16 148 L0 138 L-16 148 L-12 130 L-26 118 L-8 116 Z"
            fill={gold}
            stroke="#000"
            strokeWidth={4}
          />
        </g>
      )}
      {showText && (
        <text
          x="0"
          y="190"
          textAnchor="middle"
          fontSize="54"
          fill={gold}
          stroke="#000"
          strokeWidth={6}
          paintOrder="stroke"
          style={{ fontFamily: "var(--ff-graffiti)" }}
        >
          {art.text}
        </text>
      )}
    </g>
  );
}

/** Llamas por capas (rojo, naranja, amarillo) que suben desde `baseline`. */
function Flames({ baseline, height }: { baseline: number; height: number }) {
  const layers: [string, number][] = [
    ["#c8102e", 1],
    ["#ff6b00", 0.72],
    ["#ffd23f", 0.45],
  ];
  return (
    <g>
      {layers.map(([color, k], layer) => (
        <path
          key={color}
          d={flamePath(baseline, height * k, layer)}
          fill={color}
          stroke="#000"
          strokeWidth={layer === 0 ? 3 : 0}
        />
      ))}
    </g>
  );
}

function flamePath(baseline: number, height: number, layer: number) {
  const tongue = 40;
  const peaks = [1, 0.62, 0.85, 0.55, 0.95, 0.7, 0.88, 0.6, 1, 0.68, 0.8];
  let d = `M-10 ${baseline + 20} L-10 ${baseline}`;
  for (let i = 0; i < peaks.length; i++) {
    const x0 = -10 + i * tongue;
    const peak = peaks[(i + layer * 3) % peaks.length] * height;
    const tipX = x0 + tongue * (layer % 2 ? 0.62 : 0.4);
    d += ` C${x0 + tongue * 0.1} ${baseline - peak * 0.45} ${tipX - 12} ${baseline - peak * 0.7} ${tipX} ${baseline - peak}`;
    d += ` C${tipX + 4} ${baseline - peak * 0.6} ${x0 + tongue * 0.95} ${baseline - peak * 0.35} ${x0 + tongue} ${baseline}`;
  }
  return `${d} L430 ${baseline + 20} Z`;
}

/** Brillos de cuatro puntas que parpadean alrededor del diseño. */
function Glitter({ width, small }: { width: number; small: boolean }) {
  const spots = small
    ? [
        [0.62, -0.42, 0.55],
        [-0.6, 0.3, 0.45],
        [0.5, 0.48, 0.35],
      ]
    : [
        [0.62, -0.62, 1],
        [-0.66, -0.4, 0.75],
        [0.72, 0.36, 0.6],
        [-0.5, 0.6, 0.9],
        [0.05, -0.8, 0.5],
        [-0.85, 0.05, 0.45],
      ];
  return (
    <g>
      {spots.map(([fx, fy, size], i) => (
        // El <g> coloca el brillo; el <path> anima su propia escala (si fueran
        // el mismo elemento, la animación CSS pisaría el translate).
        <g
          key={i}
          transform={`translate(${fx * width} ${fy * width * 0.7}) scale(${size * (small ? 0.9 : 1.4)})`}
        >
          <path
            className="twinkle"
            style={{ animationDelay: `${i * -0.37}s` }}
            d="M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3 Z"
            fill={i % 2 ? "#ffffff" : "#ffd23f"}
            stroke="#000"
            strokeWidth={1.5}
          />
        </g>
      ))}
    </g>
  );
}

/** Texto repetido a lo largo de la cinta del lanyard. */
function LanyardText({ art, pathId }: { art: Art; pathId: string }) {
  const word = art.text ?? "BREAKBEAT";
  return (
    <text
      fontSize="22"
      fill={art.palette[0]}
      stroke="#000"
      strokeWidth={4}
      paintOrder="stroke"
      dominantBaseline="middle"
      style={{ fontFamily: "var(--ff-block)" }}
    >
      <textPath href={`#${pathId}`} startOffset="2%">
        {Array.from({ length: 6 }, () => word).join(" ✦ ")}
      </textPath>
    </text>
  );
}

/** Estampado de leopardo: rosetas rotas sobre el color base. */
function LeopardPattern({ id, base }: { id: string; base: string }) {
  const inner = shade(base, -0.22);
  const spots: [number, number, number, number][] = [
    [10, 12, 9, 20],
    [38, 8, 7, -30],
    [26, 32, 10, 60],
    [52, 36, 8, 10],
    [8, 46, 7, -50],
    [44, 56, 6, 35],
  ];
  return (
    <pattern
      id={id}
      width="60"
      height="64"
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(-8)"
    >
      <rect width="60" height="64" fill={base} />
      {spots.map(([cx, cy, r, rot]) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx={r}
          ry={r * 0.72}
          fill={inner}
          stroke="#1a1209"
          strokeWidth="3.2"
          strokeDasharray={`${r * 1.6} ${r * 0.7}`}
          transform={`rotate(${rot} ${cx} ${cy})`}
        />
      ))}
      {[
        [30, 18],
        [20, 54],
        [56, 22],
        [2, 28],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.4" fill="#1a1209" />
      ))}
    </pattern>
  );
}

/* ───────────────────────────── Utilidades ───────────────────────────── */

function rgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function isDark(hex: string): boolean {
  const [r, g, b] = rgb(hex);
  return 0.299 * r + 0.587 * g + 0.114 * b < 140;
}

function shade(hex: string, amount: number) {
  const channels = rgb(hex).map((c) =>
    Math.round(Math.min(255, Math.max(0, c + c * amount)))
      .toString(16)
      .padStart(2, "0"),
  );
  return `#${channels.join("")}`;
}

function nameForHex(product: Product, hex: string): string {
  return product.colors.find((color) => color.hex === hex)?.name ?? hex;
}
