
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  id: number;
}

interface Connection {
  source: number;
  target: number;
  strength: number;
}

const BrainAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 200;
    
    const nodeCount = Math.min(15, Math.floor((width || 300) / 80));
    nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 2,
      id: i,
    }));

    connectionsRef.current = [];
    nodesRef.current.forEach((node, i) => {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        if (Math.random() > 0.65) { 
          connectionsRef.current.push({
            source: i,
            target: j,
            strength: Math.random() * 0.8 + 0.2,
          });
        }
      }
    });

    const renderNodes = () => {
      if (!container) return;
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      connectionsRef.current.forEach(connection => {
        const source = nodesRef.current[connection.source];
        const target = nodesRef.current[connection.target];
        
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < width * 0.4) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          const connectionElement = document.createElement('div');
          connectionElement.classList.add('brain-connection');
          connectionElement.style.width = `${distance}px`;
          connectionElement.style.left = `${source.x}px`;
          connectionElement.style.top = `${source.y}px`;
          connectionElement.style.transform = `rotate(${angle}deg)`;
          connectionElement.style.opacity = (1 - distance / (width * 0.4)).toString();
          
          container.appendChild(connectionElement);
        }
      });
      nodesRef.current.forEach(node => {
        const nodeElement = document.createElement('div');
        nodeElement.classList.add('brain-node');
        nodeElement.style.left = `${node.x}px`;
        nodeElement.style.top = `${node.y}px`;
        nodeElement.style.width = `${node.size}px`;
        nodeElement.style.height = `${node.size}px`;
        
        container.appendChild(nodeElement);
      });
    };

    const updateNodes = () => {
      const nodes = nodesRef.current;
      
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        
        
        if (node.x <= 0 || node.x >= width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(width, node.x));
        }
        if (node.y <= 0 || node.y >= height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(height, node.y));
        }
        
        if (Math.random() < 0.01) {
          node.vx = (Math.random() - 0.5) * 0.5;
          node.vy = (Math.random() - 0.5) * 0.5;
        }
      });
      
      renderNodes();
      animationFrameRef.current = requestAnimationFrame(updateNodes);
    };


    renderNodes();
    animationFrameRef.current = requestAnimationFrame(updateNodes);
    
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      nodesRef.current.forEach(node => {
        node.x = (node.x / width) * newWidth;
        node.y = (node.y / height) * newHeight;
      });
      
      renderNodes();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden opacity-80"
      aria-hidden="true"
    />
  );
};

export default BrainAnimation;
