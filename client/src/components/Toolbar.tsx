import React from 'react';

type ToolbarProps = {
  color: string;
  setColor: (color: string) => void;
  width: number;
  setWidth: (width: number) => void;
  onClear: () => void;
  tool: 'brush' | 'stamp';
  setTool: (tool: 'brush' | 'stamp') => void;
  selectedStamp: string;
  setSelectedStamp: (stamp: string) => void;
  isGlowing: boolean;
  setIsGlowing: (isGlowing: boolean) => void;
};

const COLORS = [
  { name: 'Redstone', value: '#FF0000' },
  { name: 'Diamond', value: '#00BFFF' },
  { name: 'Emerald', value: '#00FF00' },
  { name: 'Gold', value: '#FFD700' },
  { name: 'Obsidian', value: '#000000' },
];

const STAMPS = [
  { name: 'TNT', emoji: '🧨' },
  { name: 'Creeper', emoji: '🟩' },
  { name: 'Diamond', emoji: '💎' },
];

export const Toolbar: React.FC<ToolbarProps> = ({ 
  color, setColor, 
  width, setWidth, 
  onClear,
  tool, setTool,
  selectedStamp, setSelectedStamp,
  isGlowing, setIsGlowing
}) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800/90 border-4 border-gray-400 p-2 flex items-center gap-4 shadow-voxel z-10">
      
      {/* Tools Section */}
      <div className="flex gap-2 border-r-2 border-gray-600 pr-4">
        <button
          onClick={() => setTool('brush')}
          className={`w-10 h-10 border-4 flex items-center justify-center bg-gray-700 text-white ${
            tool === 'brush' ? 'border-white scale-110' : 'border-gray-600 hover:border-gray-400'
          }`}
          title="Brush"
        >
          🖌️
        </button>
        
        {/* Redstone Glow Toggle */}
        <button
          onClick={() => setIsGlowing(!isGlowing)}
          className={`w-10 h-10 border-4 flex items-center justify-center bg-gray-700 text-white transition-all ${
            isGlowing ? 'border-red-500 shadow-[0_0_10px_red]' : 'border-gray-600 hover:border-gray-400'
          }`}
          title="Redstone Glow"
        >
          ✨
        </button>
      </div>

      {/* Color Picker Slots (Only visible if Brush is selected) */}
      {tool === 'brush' && (
        <div className="flex gap-2">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.value)}
              className={`w-10 h-10 border-4 transition-all active:translate-y-1 active:translate-x-1 active:shadow-none ${
                color === c.value ? 'border-white scale-110' : 'border-gray-600 hover:border-gray-400'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>
      )}

      {/* Inventory / Stamps Section */}
      <div className="flex gap-2 border-l-2 border-gray-600 pl-4">
        {STAMPS.map((s) => (
          <button
            key={s.name}
            onClick={() => {
              setTool('stamp');
              setSelectedStamp(s.emoji);
            }}
            className={`w-10 h-10 border-4 flex items-center justify-center bg-gray-700 text-2xl transition-all active:translate-y-1 active:translate-x-1 active:shadow-none ${
              tool === 'stamp' && selectedStamp === s.emoji ? 'border-white scale-110' : 'border-gray-600 hover:border-gray-400'
            }`}
            title={s.name}
          >
            {s.emoji}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-1 h-10 bg-gray-600 mx-2" />

      {/* Brush Size */}
      <div className="flex flex-col items-center gap-1">
        <label className="font-vt323 text-white text-lg leading-none">SIZE</label>
        <input
          type="range"
          min="1"
          max="20"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
          className="w-24 accent-gray-400 cursor-pointer"
        />
      </div>

      {/* Divider */}
      <div className="w-1 h-10 bg-gray-600 mx-2" />

      {/* Clear Button */}
      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-600 border-4 border-red-800 text-white font-press-start text-xs shadow-voxel active:translate-y-1 active:translate-x-1 active:shadow-none hover:bg-red-500 transition-colors"
      >
        CLEAR
      </button>
    </div>
  );
};
