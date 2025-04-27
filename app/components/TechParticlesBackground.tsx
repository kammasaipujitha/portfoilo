'use client';
import { useEffect, useRef, useState } from 'react';

export default function TechParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId: number | undefined;

    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const techIcons = [
      { name: 'React', img: '/icons/react.png' },
      { name: 'Node.js', img: '/icons/nodejs.png' },
      { name: 'Python', img: '/icons/python.png' },
      { name: 'TensorFlow', img: '/icons/tensorflow.png' },
      { name: 'JavaScript', img: '/icons/javascript.png' },
      { name: 'MongoDB', img: '/icons/mongodb.png' },
      { name: 'PyTorch', img: '/icons/pytorch.png' },
      { name: 'HTML5', img: '/icons/html5.png' },
      { name: 'CSS3', img: '/icons/css3.png' },
      { name: 'Git', img: '/icons/git.png' },
      { name: 'AWS', img: '/icons/aws.png' },
      { name: 'Next.js', img: '/icons/nextjs.png' },
      { name: 'SQL', img: '/icons/sql.png' },
      { name: 'TypeScript', img: '/icons/typescript.png' }
    ];

    type LoadedIcon = { name: string; img: string; image: HTMLImageElement | null };

    const imagePromises = techIcons.map(icon => {
      return new Promise<LoadedIcon>((resolve) => {
        const img = new Image();
        img.onload = () => resolve({ ...icon, image: img });
        img.onerror = () => resolve({ ...icon, image: null });
        img.src = icon.img;
      });
    });

    Promise.all(imagePromises).then((loadedIcons: LoadedIcon[]) => {
      const filteredIcons = loadedIcons.filter((icon) => icon.image !== null) as LoadedIcon[];
      setIsImagesLoaded(true);
      initAnimation(filteredIcons);
    });

    function initAnimation(loadedIcons: LoadedIcon[]) {
      const particlesArray: (TechParticle | ConnectingParticle)[] = [];
      const numberOfParticles = Math.min(60, Math.floor(window.innerWidth * window.innerHeight / 15000));

      class TechParticle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        tech: LoadedIcon;
        opacity: number;
        rotation: number;
        rotationSpeed: number;
        pulse: number;
        pulseSpeed: number;

        constructor() {
          this.x = Math.random() * (canvas?.width || 0);
          this.y = Math.random() * (canvas?.height || 0);
          this.size = Math.random() * 15 + 35;
          this.speedX = Math.random() * 0.4 - 0.2;
          this.speedY = Math.random() * 0.4 - 0.2;
          this.tech = loadedIcons[Math.floor(Math.random() * loadedIcons.length)];
          this.opacity = Math.random() * 0.3 + 0.1;
          this.rotation = Math.random() * Math.PI * 2;
          this.rotationSpeed = (Math.random() - 0.5) * 0.01;
          this.pulse = 0;
          this.pulseSpeed = 0.02;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.rotation += this.rotationSpeed;
          this.pulse += this.pulseSpeed;
          if (this.pulse > Math.PI * 2) this.pulse = 0;

          if (canvas) {
            if (this.x > canvas.width - this.size / 2) {
              this.x = canvas.width - this.size / 2;
              this.speedX *= -1;
            }
            if (this.x < this.size / 2) {
              this.x = this.size / 2;
              this.speedX *= -1;
            }
            if (this.y > canvas.height - this.size / 2) {
              this.y = canvas.height - this.size / 2;
              this.speedY *= -1;
            }
            if (this.y < this.size / 2) {
              this.y = this.size / 2;
              this.speedY *= -1;
            }
          }
        }

        draw() {
          if (!this.tech?.image || !ctx) return;

          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.rotation);

          const pulseEffect = Math.sin(this.pulse) * 0.1;
          ctx.globalAlpha = Math.max(0.1, Math.min(0.5, this.opacity + pulseEffect));

          ctx.beginPath();
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.shadowColor = 'rgba(30, 144, 255, 0.2)';
          ctx.shadowBlur = 15;
          ctx.clip();
          ctx.drawImage(this.tech.image, -this.size / 2, -this.size / 2, this.size, this.size);

          ctx.restore();
        }
      }

      class ConnectingParticle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        color: string;

        constructor() {
          this.x = Math.random() * (canvas?.width || 0);
          this.y = Math.random() * (canvas?.height || 0);
          this.size = Math.random() * 1.5 + 0.5;
          this.speedX = Math.random() * 0.8 - 0.4;
          this.speedY = Math.random() * 0.8 - 0.4;
          this.color = 'rgba(120, 120, 120, 0.5)';
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          if (canvas) {
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
          }
        }

        draw() {
          if (!ctx) return;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function init() {
        const techParticleCount = Math.min(15, Math.max(8, Math.floor(window.innerWidth / 150)));

        for (let i = 0; i < techParticleCount; i++) {
          particlesArray.push(new TechParticle());
        }
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new ConnectingParticle());
        }
      }

      function connect() {
        const connectionDistance = canvas ? (canvas.width / 8) * (canvas.height / 8) : 0;

        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = dx * dx + dy * dy;

            if (distance < connectionDistance) {
              const opacity = 0.3 * (1 - distance / connectionDistance);
              if (ctx) {
                ctx.strokeStyle = `rgba(80, 80, 100, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
              }
            }
          }
        }
      }

      function animate() {
        if (ctx) {
          if (canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          particlesArray.forEach(p => {
            p.update();
            p.draw();
          });
        }
        connect();
        animationFrameId = requestAnimationFrame(animate);
      }

      const handleResize = () => {
        resizeCanvas();
        if (particlesArray.length > 0) {
          particlesArray.length = 0;
          init();
        }
      };

      window.addEventListener('resize', handleResize);
      init();
      animate();

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      };
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-white z-[-3]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_70%)] z-[-2]" />
      <canvas ref={canvasRef} className="fixed inset-0 z-[-1]" />
    </>
  );
}