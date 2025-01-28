import React, { useEffect, useRef } from 'react';

import BackgroundImage from '@assets/images/main/banner.png';
import Box1 from '@assets/images/main/box1.svg';
import Box2 from '@assets/images/main/box2.svg';
import Box3 from '@assets/images/main/box3.svg';
import Box4 from '@assets/images/main/box4.svg';
import Box5 from '@assets/images/main/box5.svg';
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

const images = [Box1, Box2, Box3, Box4, Box5];

const GravityImage: React.FC = () => {
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
    const height = 400; // Fixed height

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        showVelocity: true,
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
          fillStyle: 'transparent', // 상단 벽의 색상
        },
      }), // Top boundary
      Bodies.rectangle(width / 2, height, width, 50.5, {
        isStatic: true,
        render: {
          fillStyle: 'transparent', // 하단 벽의 색상
        },
      }), // Bottom boundary
      Bodies.rectangle(width, height / 2, 50, height, {
        isStatic: true,
        render: {
          fillStyle: 'transparent', // 우측 벽의 색상
        },
      }), // Right boundary
      Bodies.rectangle(0, height / 2, 50, height, {
        isStatic: true,
        render: {
          fillStyle: 'transparent', // 좌측 벽의 색상
        },
      }), // Left boundary
    ]);

    // Set gravity (optional: reverse gravity or adjust it)
    engine.gravity.y = 1; // Default downward gravity

    // Add images as falling bodies
    images.forEach((src, index) => {
      // 짝수 인덱스는 왼쪽, 홀수 인덱스는 오른쪽에서 생성
      const isLeft = index % 2 === 0;

      const xPosition = isLeft
        ? Common.random(50, 150) // 왼쪽 영역
        : Common.random(width - 150, width - 50); // 오른쪽 영역

      const imageBody = Bodies.rectangle(
        xPosition,
        Common.random(100, 400),
        80,
        80,
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
    let scrollTimeout: number | undefined;
    function handleScroll() {
      render.canvas.style.pointerEvents = 'none';
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        render.canvas.style.pointerEvents = 'auto';
      }, 200);
    }

    render.canvas.addEventListener('wheel', handleScroll, { passive: true });

    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Cleanup on component unmount
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      Composite.clear(world, false);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      style={{
        width: '100vw',
        height: '400px',
        position: 'relative',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover', // 추가
        backgroundPosition: 'center', // 추가
        backgroundRepeat: 'no-repeat', // 추가
      }}
    />
  );
};

export default GravityImage;
