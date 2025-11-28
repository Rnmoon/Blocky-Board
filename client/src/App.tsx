import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';

const socket = io('http://localhost:3001');

function App() {
  const [color, setColor] = useState<string>('#000000');
  const [width, setWidth] = useState<number>(5);
  const [tool, setTool] = useState<'brush' | 'stamp'>('brush');
  const [selectedStamp, setSelectedStamp] = useState<string>('🧨');
  const [isGlowing, setIsGlowing] = useState<boolean>(false);

  useEffect(() => {
    function onConnect() {
      console.log('Connected to server');
    }

    function onDisconnect() {
      console.log('Disconnected from server');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const handleClear = () => {
    socket.emit('clear');
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-sky flex items-center justify-center font-vt323">
      {/* Background Pattern Overlay (Optional for texture) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Map/Canvas Container */}
      <div className="relative border-8 border-gray-900 shadow-voxel bg-white w-full h-full">
        <Canvas 
          socket={socket} 
          color={color} 
          width={width} 
          tool={tool}
          selectedStamp={selectedStamp}
          isGlowing={isGlowing}
        />
      </div>

      {/* Minecraft Hotbar */}
      <Toolbar 
        color={color} 
        setColor={setColor} 
        width={width} 
        setWidth={setWidth} 
        onClear={handleClear} 
        tool={tool}
        setTool={setTool}
        selectedStamp={selectedStamp}
        setSelectedStamp={setSelectedStamp}
        isGlowing={isGlowing}
        setIsGlowing={setIsGlowing}
      />
      
      {/* Title/Overlay */}
      <div className="absolute top-4 left-4 text-white font-press-start text-2xl drop-shadow-[4px_4px_0_rgba(0,0,0,1)] pointer-events-none z-20">
        BLOCKY BOARD
      </div>
    </div>
  );
}

export default App;
