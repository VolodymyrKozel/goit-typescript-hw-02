import { useState } from 'react';

export default function useToggle() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return { isOpen, open, close };
}
