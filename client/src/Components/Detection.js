import React, { useState } from "react";
import styled from 'styled-components';
import ImageUpload from "./ImageUpload";
import ImagesCard from "./ImagesCard";
import Loader from "./Loader/Loader";
import ResultCard from "./ResultCard";
import axios from 'axios';
import { motion } from 'framer-motion';

const Body = styled.div`
  display: flex; 
  align-items: center;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
  overflow-y: scroll;
  padding: 2rem;
`;

const Heading = styled(motion.div)`
  font-size: 42px;
  @media (max-width: 530px) {
    font-size: 30px
  }
  font-weight: 600;
  color: #64ffda;
  margin: 2% 0px;
  text-align: center;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex; 
  justify-content: center;
  flex-direction: row;
  @media (max-width: 1100px) {
    flex-direction: column;
  }
  gap: 40px;
  padding: 2% 0% 6% 0%;
`;

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FlexItem = styled.div`
  flex: 1;
  min-width: 300px;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SelectedImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

const Button = styled(motion.button)`
  min-height: 48px;
  border-radius: 8px;
  background: linear-gradient(120deg, #64ffda, #48b1bf);
  color: #0a192f;
  border: none;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;

const Typo = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #64ffda;
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const NoImagesText = styled(motion.div)`
  color: #8892b0;
  text-align: center;
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const Detection = () => {
  const [images, setImages] = useState(null);
  const [predictedImage, setPredictedImage] = useState(null);
  const [predictions, setPredictions] = useState();
  const [loading, setLoading] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

  const generatePrediction = async () => {
    setLoading(true);
    const imageData = []
    for (let i = 0; i < images.length; i++) {
      imageData.push(images[i].base64_file)
    }
    const data = { image: imageData }
    const res = await axios.post('http://localhost:5000/', data).catch((err) => {
      console.log(err);
    });
    setPredictedImage(images)
    setPredictions({ image: imageData, result: res.data.result })
    setShowPrediction(true);
    setLoading(false);
  }

  return (
    <Body>
      <Heading
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Brain Tumor Detector 🧠
      </Heading>
      {loading ? (
        <Centered>
          <Loader />
        </Centered>
      ) : (
        <Container>
          <FlexItem>
            <ImageUpload images={images} setImages={setImages} />
            {images && images.length > 0 ? (
              <>
                <SelectedImages>
                  {images.map((image, index) => (
                    <ImagesCard
                      key={index}
                      image={image}
                    />
                  ))}
                </SelectedImages>
                <Button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generatePrediction}
                >
                  PREDICT
                </Button>
              </>
            ) : (
              <NoImagesText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Upload MRI scans to begin analysis
              </NoImagesText>
            )}
          </FlexItem>
          {showPrediction && (
            <FlexItem>
              <Typo>Our Predictions</Typo>
              <ResultWrapper>
                {predictedImage.map((image, index) => (
                  <ResultCard
                    key={index}
                    image={image}
                    prediction={predictions.result[index]}
                  />
                ))}
              </ResultWrapper>
            </FlexItem>
          )}
        </Container>
      )}
    </Body>
  );
};

export default Detection; 