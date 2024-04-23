// Component wrapper for marker based tracking
"use client"

// imports
import React, { useEffect, useRef, useState } from 'react';
import { ArToolkitSource, ArToolkitContext } from '@ar-js-org/ar.js/three.js/build/ar-threex';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

const ARComponent = () => {
    const [arReady, setArReady] = useState(false);
    const arToolkitSource = useRef(null);
    const arToolkitContext = useRef(null);

    useEffect(() => {
        // Initialize AR Toolkit Source
        arToolkitSource.current = new ArToolkitSource({
            sourceType: 'webcam',
        });

        arToolkitSource.current.init(() => {
            // Resize the renderer when the video becomes ready
            onResize();
            setArReady(true);
        });

        // Initialize AR Toolkit Context
        arToolkitContext.current = new ArToolkitContext({
            cameraParametersUrl: '???',
            detectionMode: 'mono',
        });

        arToolkitContext.current.init(() => {
            if (arToolkitContext.current.arController !== null) {
                arToolkitContext.current.arController.addEventListener('getMarker', () => {
                    console.log('Marker found');
                });
            }
            console.log('AR.js is initialized');
        });

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            arToolkitSource.current.dispose();
            arToolkitContext.current.dispose();
        };
    }, []);

    // Handle window resizing
    const onResize = () => {
        if (!arToolkitSource.current) return;
        arToolkitSource.current.onResize();
        arToolkitSource.current.copySizeTo(arToolkitContext.current.arController.canvas);
    };

    // Update AR on each frame
    useFrame(() => {
        if (arToolkitContext.current && arToolkitSource.current?.ready) {
            arToolkitContext.current.update(arToolkitSource.current.domElement);
        }
    });

    return (
        <Canvas onCreated={({ gl }) => {
            // Set up Three.js with AR.js controller
            if (arToolkitContext.current?.arController) {
                arToolkitContext.current.arController.setupThreejs(gl);
            }
        }}>
            {arReady && (
                <>
                    <PerspectiveCamera makeDefault fov={70} />
                    {/* Add your AR content here, e.g., 3D models, marker controls */}
                </>
            )}
        </Canvas>
    );
};

export default ARComponent;
