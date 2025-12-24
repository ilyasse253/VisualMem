import React, { useEffect } from 'react'

interface ImagePreviewProps {
  imageUrl: string
  timestamp?: string
  onClose: () => void
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, timestamp, onClose }) => {
  // 按 ESC 键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // 点击遮罩层关闭
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="image-preview-overlay" onClick={handleBackdropClick}>
      <div className="image-preview-container">
        <button className="image-preview-close" onClick={onClose} title="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <img src={imageUrl} alt="Preview" className="image-preview-img" />
        {timestamp && (
          <div className="image-preview-timestamp">{timestamp}</div>
        )}
      </div>
    </div>
  )
}

export default ImagePreview

