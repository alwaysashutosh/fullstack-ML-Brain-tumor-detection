import { prepareCssVars } from '@mui/system';
import React from 'react'
import styled from 'styled-components';
import { useTheme } from 'styled-components';

const Container = styled.div`
    height: fit-content;
    background: rgba(17, 34, 64, 0.5);
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 12px;
    display: flex;
    gap: 14px;
    flex-direction: row;
    @media (max-width: 430px) {
        flex-direction: column;
    }
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.02);
    }
`
const Image = styled.img`
    height: 150px;
    @media (max-width: 430px) {
      width: 100%;
      height: auto;
    }
    object-fit: cover;
    border: 3px solid ${({ prediction }) => prediction ? '#FF4D4D' : '#64ffda'};
    border-radius: 12px;
    box-shadow: 0 0 10px ${({ prediction }) => prediction ? 'rgba(255, 77, 77, 0.3)' : 'rgba(100, 255, 218, 0.3)'};
`
const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${({ prediction }) => prediction ? '#FF4D4D' : '#64ffda'};
`

const Description = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #8892b0;
`
const File = styled.div`
    font-size: 15px;
    font-weight: 400;
    color: #8892b0;
`
const Probability = styled.div`
    font-size: 17px;
    font-weight: 600;
    margin-top: 10px;
    color: ${({ prediction }) => prediction ? '#FF4D4D' : '#64ffda'};
`;

const HospitalsSection = styled.div`
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(100, 255, 218, 0.2);
`;

const HospitalTitle = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #64ffda;
    margin-bottom: 8px;
`;

const HospitalCard = styled.a`
    display: block;
    background: rgba(17, 34, 64, 0.3);
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 8px;
    text-decoration: none;
    border: 1px solid rgba(100, 255, 218, 0.2);
    transition: all 0.3s ease;

    &:hover {
        background: rgba(17, 34, 64, 0.5);
        border-color: #64ffda;
    }
`;

const HospitalName = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: #64ffda;
    margin-bottom: 4px;
`;

const HospitalAddress = styled.div`
    font-size: 13px;
    color: #8892b0;
`;

const hospitals = [
    {
        name: "Sahyadri Super Speciality Hospital",
        address: "Plot No. 30-C, Yerwada, Karve Road, Pune - 411004",
        phone: "+91-20-67213400",
        maps: "https://maps.app.goo.gl/tjGYDa7eZBECVSr59"
    },
    {
        name: "Ruby Hall Clinic",
        address: "40, Sassoon Road, Pune - 411001",
        phone: "+91-20-26163391",
        maps: "https://maps.app.goo.gl/r4aoNyQGT41sHLWm9"
    },
    {
        name: "Deenanath Mangeshkar Hospital",
        address: "Yerwada, Pune - 411004",
        phone: "+91-20-49153000",
        maps: "https://maps.app.goo.gl/kDGFfcdswWrWReWp6"
    }
];

const ResultCard = ({image, prediction}) => {
    var probability = prediction*100
    if(probability>50){
        prediction = 1
    }
    else if(probability<50){
        prediction = 0
        probability = 100.000 - probability
    }
    return (
        <Container>
            <Image prediction={prediction} src={image.base64_file} alt="image" />
            <Body>
                <Title prediction={prediction}>{prediction ? "Tumor Detected" : "No Tumor Detected"}</Title>
                <Description>
                    {prediction 
                        ? "According to our prediction on basis of our ML model there is a possibility on tumor detected in the image."
                        : "According to our prediction on basis of our ML model there is a possibility on no tumor detected in the image."
                    }
                </Description>
                <File>File: {image.file_name}</File>
                <Probability prediction={prediction}>Accuracy: {Math.round(probability*100)/100}%</Probability>

                {prediction === 1 && (
                    <HospitalsSection>
                        <HospitalTitle>Recommended Hospitals in Pune</HospitalTitle>
                        {hospitals.map((hospital, index) => (
                            <HospitalCard key={index} href={hospital.maps} target="_blank" rel="noopener noreferrer">
                                <HospitalName>{hospital.name}</HospitalName>
                                <HospitalAddress>{hospital.address}</HospitalAddress>
                                <HospitalAddress>Phone: {hospital.phone}</HospitalAddress>
                            </HospitalCard>
                        ))}
                    </HospitalsSection>
                )}
            </Body>
        </Container>
    )
}

export default ResultCard