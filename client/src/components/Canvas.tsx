import { useEffect, useRef, useState } from 'react';
import { useDraw } from '../hooks/useDraw';
import { drawLine } from '../utils/drawLine';
import { Socket } from 'socket.io-client';
import { throttle } from '../utils/throttle';

type CanvasProps = {
  socket: Socket;
  color: string;
  width: number;
  tool: 'brush' | 'stamp';
  selectedStamp: string;
  isGlowing: boolean;
};

type DrawLineProps = {
  prevPoint: Point | null;
  currentPoint: Point;
  color: string;
  width: number;
  isGlowing?: boolean;
};

type Point = { x: number; y: number };

type Cursor = {
  userId: string;
  x: number;
  y: number;
};

export const Canvas = ({ socket, color, width, tool, selectedStamp, isGlowing }: CanvasProps) => {
  const { canvasRef, onMouseDown, clear } = useDraw(createDraw);
  const cursorCanvasRef = useRef<HTMLCanvasElement>(null);
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});

  function createDraw({ ctx, currentPoint, prevPoint }: { ctx: CanvasRenderingContext2D; currentPoint: Point; prevPoint: Point | null }) {
    if (tool === 'brush') {
      drawLine({ prevPoint, currentPoint, ctx, color, width, isGlowing });
      socket.emit('draw-line', { prevPoint, currentPoint, color, width, isGlowing });
    } else if (tool === 'stamp' && !prevPoint) {
      // Only draw stamp on initial click (no drag)
      drawStamp(ctx, currentPoint.x, currentPoint.y, selectedStamp);
      socket.emit('draw-stamp', { x: currentPoint.x, y: currentPoint.y, stamp: selectedStamp });
    }
  }

  const drawStamp = (ctx: CanvasRenderingContext2D, x: number, y: number, stamp: string) => {
    ctx.font = '40px Arial';
    ctx.fillText(stamp, x - 20, y + 10); // Center the emoji
  };

  // Handle Cursor Movement
  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      socket.emit('cursor-move', { x, y, userId: socket.id });
    }, 30);

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [socket]);

  // Render Cursors
  useEffect(() => {
    const ctx = cursorCanvasRef.current?.getContext('2d');
    if (!ctx || !cursorCanvasRef.current) return;

    ctx.clearRect(0, 0, cursorCanvasRef.current.width, cursorCanvasRef.current.height);

    Object.values(cursors).forEach(({ x, y }) => {
      // Draw Pickaxe Cursor
      ctx.save();
      ctx.translate(x, y);
      
      // Simple Pickaxe SVG Path or Emoji
      ctx.font = '24px Arial';
      ctx.fillText('⛏️', 0, 0);
      
      // Optional: Draw username if available
      // ctx.font = '10px VT323';
      // ctx.fillText('Player', 15, 15);
      
      ctx.restore();
    });
  }, [cursors]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    socket.on('client-ready', (drawingHistory: DrawLineProps[]) => {
      if (!ctx) return;
      drawingHistory.forEach((line) => {
        drawLine({ ...line, ctx });
      });
    });

    socket.on('draw-line', ({ prevPoint, currentPoint, color, width, isGlowing }: DrawLineProps) => {
      if (!ctx) return;
      drawLine({ prevPoint, currentPoint, ctx, color, width, isGlowing });
    });

    socket.on('draw-stamp', ({ x, y, stamp }: { x: number; y: number; stamp: string }) => {
      if (!ctx) return;
      drawStamp(ctx, x, y, stamp);
    });

    socket.on('cursor-move', ({ x, y, userId }: Cursor) => {
      setCursors((prev) => ({ ...prev, [userId]: { x, y, userId } }));
    });

    socket.on('clear', () => {
      clear();
    });

    return () => {
      socket.off('client-ready');
      socket.off('draw-line');
      socket.off('draw-stamp');
      socket.off('cursor-move');
      socket.off('clear');
    };
  }, [socket, clear]);

  return (
    <div className="relative w-full h-full">
      {/* Drawing Layer */}
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute top-0 left-0 bg-white cursor-crosshair"
      />
      
      {/* Cursor Overlay Layer */}
      <canvas
        ref={cursorCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        className="absolute top-0 left-0 pointer-events-none"
      />
    </div>
  );
};
