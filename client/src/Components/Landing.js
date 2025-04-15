import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a192f 0%, #112240 100%);
  color: #fff;
  padding: 2rem;
  overflow: hidden;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  position: relative;
`;

const HeroBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Circle = styled(motion.div)`
  position: absolute;
  background: radial-gradient(circle, ${props => props.color} 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0.1;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  background: linear-gradient(120deg, #64ffda, #48b1bf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 1;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #8892b0;
  max-width: 600px;
  z-index: 1;
`;

const StartButton = styled(motion.button)`
  background: linear-gradient(120deg, #64ffda, #48b1bf);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: #0a192f;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover:before {
    left: 100%;
  }
`;

const StatsSection = styled.div`
  padding: 4rem 0;
  background: rgba(17, 34, 64, 0.3);
  margin: 2rem 0;
  position: relative;
  overflow: hidden;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(17, 34, 64, 0.5);
  border-radius: 10px;
  border: 1px solid #64ffda;
  position: relative;
  overflow: hidden;

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

const StatNumber = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: bold;
  color: #64ffda;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #8892b0;
  font-size: 1.1rem;
`;

const FeaturesSection = styled.div`
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  color: #64ffda;
  text-align: center;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(17, 34, 64, 0.5);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #64ffda;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  color: #64ffda;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #8892b0;
  line-height: 1.6;
`;

const TestimonialsSection = styled.div`
  padding: 4rem 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TestimonialCard = styled.div`
  background: rgba(17, 34, 64, 0.5);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #64ffda;
`;

const TestimonialText = styled.p`
  color: #8892b0;
  font-style: italic;
  margin-bottom: 1rem;
`;

const TestimonialAuthor = styled.p`
  color: #64ffda;
  font-weight: bold;
`;

const features = [
  {
    title: "Real-time Analysis",
    description: "Get instant results with our high-performance model, optimized for quick and accurate predictions."
  },
  {
    title: "User-Friendly Interface",
    description: "Simple drag-and-drop interface for uploading MRI scans, with clear and detailed results presentation."
  },
  {
    title: "High Accuracy",
    description: "Our model achieves 98.99% accuracy, validated through extensive testing on diverse medical datasets."
  }
];

const testimonials = [
  {
    text: "This AI-powered brain tumor detection system has revolutionized our diagnostic process. The accuracy is remarkable!",
    author: "Dr. Sarah Johnson, Neurologist"
  },
  {
    text: "As a medical researcher, I'm impressed by the advanced technology and ease of use. It's a game-changer in medical imaging.",
    author: "Prof. Michael Chen, Research Director"
  },
  {
    text: "The system's ability to detect tumors early has helped us save countless lives. It's an invaluable tool for modern medicine.",
    author: "Dr. Emily Rodriguez, Radiologist"
  }
];

const Landing = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <LandingContainer>
      <Hero>
        <HeroBg>
          {[...Array(5)].map((_, i) => (
            <Circle
              key={i}
              color="#64ffda"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [1, 2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
              }}
            />
          ))}
        </HeroBg>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Brain Tumor Detection
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Advanced AI-powered system for early and accurate brain tumor detection.
          Using cutting-edge machine learning to assist medical professionals.
        </Subtitle>
        <StartButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/detect')}
        >
          Start Detection Now
        </StartButton>
      </Hero>

      <StatsSection>
        <StatsGrid>
          <StatCard
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StatNumber>98.06%</StatNumber>
            <StatLabel>Model Accuracy</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StatNumber>3,800+</StatNumber>
            <StatLabel>Images Tested</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <StatNumber>3 sec</StatNumber>
            <StatLabel>Average Processing Time</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <FeaturesSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </SectionTitle>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>
      
      <TestimonialsSection>
        <SectionTitle>What Experts Say</SectionTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index}>
              <TestimonialText>"{testimonial.text}"</TestimonialText>
              <TestimonialAuthor>- {testimonial.author}</TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsSection>
    </LandingContainer>
  );
};

export default Landing; 