 'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');

    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // تغيير الـ cursor حسب العنصر
      const target = e.target as HTMLElement;

      if (!target) return;

      // Links و Buttons → Hand Pointer
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button'
      ) {
        cursor.setAttribute('data-type', 'pointer');
        return;
      }

      // Text Input → Text Cursor
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        cursor.setAttribute('data-type', 'text');
        return;
      }

      // Default Arrow
      cursor.setAttribute('data-type', 'default');
    };

    // Mouse leave/enter
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div id="custom-cursor" />;
}