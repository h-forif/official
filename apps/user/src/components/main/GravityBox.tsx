import React, { useEffect, useRef } from 'react';

import BackgroundImage from '@assets/images/banner.png';
import Matter, {
  Bodies,
  Common,
  Composite,
  Engine,
  Mouse,
  MouseConstraint,
  Render,
  Runner,
} from 'matter-js';

interface GravityImageProps {
  images: string[]; // Array of image URLs
}

const GravityImage: React.FC<GravityImageProps> = ({ images }) => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create Matter.js engine
    const engine = Engine.create();
    engineRef.current = engine;
    const { world } = engine;

    // Fixed height, dynamic width
    const width = sceneRef.current.clientWidth;
    const height = 300; // Fixed height

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: `url(${BackgroundImage}) no-repeat`,
        showVelocity: true,
        showAngleIndicator: true,
      },
    });
    renderRef.current = render;

    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add static boundary bodies with custom colors
    Composite.add(world, [
      Bodies.rectangle(width / 2, 0, width, 50, {
        isStatic: true,
        render: {
          fillStyle: '#1D40BA', // 상단 벽의 색상
        },
      }), // Top boundary
      Bodies.rectangle(width / 2, height, width, 50.5, {
        isStatic: true,
        render: {
          fillStyle: '#1D40BA', // 하단 벽의 색상
        },
      }), // Bottom boundary
      Bodies.rectangle(width, height / 2, 50, height, {
        isStatic: true,
        render: {
          fillStyle: '#1D40BA', // 우측 벽의 색상
        },
      }), // Right boundary
      Bodies.rectangle(0, height / 2, 50, height, {
        isStatic: true,
        render: {
          fillStyle: '#1D40BA', // 좌측 벽의 색상
        },
      }), // Left boundary
    ]);

    // Set gravity (optional: reverse gravity or adjust it)
    engine.gravity.y = 1; // Default downward gravity

    // Add images as falling bodies
    images.forEach((src) => {
      const imageBody = Bodies.rectangle(
        Common.random(width - 150, width - 50), // Random X position near the right edge
        Common.random(100, 300), // Random Y position
        80, // Width of image
        80, // Height of image
        {
          render: {
            sprite: {
              texture: src,
              xScale: 0.3,
              yScale: 0.3,
            },
          },
        },
      );
      Composite.add(world, imageBody);
    });

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Handle window resize
    const handleResize = () => {
      if (sceneRef.current && renderRef.current) {
        const newWidth = sceneRef.current.clientWidth;

        // Update render options
        Render.setPixelRatio(render, newWidth);

        // Update boundaries
        Composite.clear(world, false, true); // Clear existing boundaries

        Composite.add(world, [
          Bodies.rectangle(width / 2, 0, width, 50, {
            isStatic: true,
            render: {
              fillStyle: 'red', // 상단 벽의 색상
            },
          }), // Top boundary
          Bodies.rectangle(width / 2, height, width, 50.5, {
            isStatic: true,
            render: {
              fillStyle: 'green', // 하단 벽의 색상
            },
          }), // Bottom boundary
          Bodies.rectangle(width, height / 2, 50, height, {
            isStatic: true,
            render: {
              fillStyle: 'blue', // 우측 벽의 색상
            },
          }), // Right boundary
          Bodies.rectangle(0, height / 2, 50, height, {
            isStatic: true,
            render: {
              fillStyle: 'yellow', // 좌측 벽의 색상
            },
          }), // Left boundary
        ]);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      Composite.clear(world, false);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener('resize', handleResize);
    };
  }, [images]);

  return (
    <div
      ref={sceneRef}
      style={{
        width: '100%', // Full width, responsive
        height: '300px', // Fixed height
        position: 'relative',
      }}
    />
  );
};

export default GravityImage;
