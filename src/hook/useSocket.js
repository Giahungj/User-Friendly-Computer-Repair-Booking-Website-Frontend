import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (userId) => {
    const socketRef = useRef(null);

    useEffect(() => {
        if (!userId) return;

        console.log('Khởi tạo socket cho userId:', userId);

        socketRef.current = io('http://localhost:8080', {
            withCredentials: true,
            transports: ['websocket', 'polling'] // fallback nếu WS bị chặn
        });

        /* ---------- events ---------- */
        socketRef.current.on('connect', () => {
            console.log('Socket connected, id:', socketRef.current.id);
            socketRef.current.emit('auth', userId);          // join room sau khi connect
            console.log('Đã gửi auth cho user', userId);
        });

        socketRef.current.on('connect_error', err =>
            console.error('connect_error:', err)
        );

        socketRef.current.on('error', err =>
            console.error('socket error:', err)
        );

        socketRef.current.on('disconnect', reason =>
            console.log('Socket disconnected:', reason)
        );

        return () => {
            console.log('Đóng socket cho user', userId);
            socketRef.current.close();
        };
    }, [userId]);

    return socketRef;
};

export default useSocket;
