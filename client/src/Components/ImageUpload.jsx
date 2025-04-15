import React, { useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

const UploadContainer = styled(motion.div)`
  width: 100%;
  min-height: 200px;
  border: 2px dashed #64ffda;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(17, 34, 64, 0.3);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #48b1bf;
    background: rgba(17, 34, 64, 0.5);
  }

  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover:after {
    opacity: 1;
  }
`;

const UploadIcon = styled(motion.div)`
  color: #64ffda;
  margin-bottom: 1rem;
  svg {
    width: 48px;
    height: 48px;
  }
`;

const UploadText = styled.div`
  color: #8892b0;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const UploadSubText = styled.div`
  color: #64ffda;
  font-size: 0.9rem;
  text-align: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImageUpload = ({ images, setImages }) => {
  const handleImageUpload = useCallback((e) => {
    const files = Array.from(e.target.files);
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => {
          if (!prev) return [{ base64_file: reader.result, file_name: file.name }];
          return [...prev, { base64_file: reader.result, file_name: file.name }];
        });
      };
      reader.readAsDataURL(file);
    });
  }, [setImages]);

  return (
    <UploadContainer
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => document.getElementById('file-input').click()}
    >
      <UploadIcon
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <Upload />
      </UploadIcon>
      <UploadText>Drag & Drop your MRI scan here</UploadText>
      <UploadSubText>or click to browse</UploadSubText>
      <HiddenInput
        id="file-input"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
    </UploadContainer>
  );
};

export default ImageUpload;