type DrawLineProps = {
    ctx: CanvasRenderingContext2D;
    currentPoint: Point;
    prevPoint: Point | null;
    color: string;
    width: number;
    isGlowing?: boolean;
};

type Point = { x: number; y: number };

export const drawLine = ({ prevPoint, currentPoint, ctx, color, width, isGlowing }: DrawLineProps) => {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = width;

    let startPoint = prevPoint ?? currentPoint;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;

    if (isGlowing) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'red';
    } else {
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'transparent';
    }

    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Reset shadow to avoid affecting other drawings
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
};
