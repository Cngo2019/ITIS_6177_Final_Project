export interface FaceAttributes {
    age?: number;
    gender?: 'male' | 'female';
    smile?: number;
    facialHair?: {
        moustache: number;
        beard: number;
        sideburns: number;
    };
    glasses?: 'NoGlasses' | 'ReadingGlasses' | 'Sunglasses' | 'SwimmingGoggles';
    headPose?: {
        pitch: number;
        roll: number;
        yaw: number;
    };
    emotion?: {
        anger: number;
        contempt: number;
        disgust: number;
        fear: number;
        happiness: number;
        neutral: number;
        sadness: number;
        surprise: number;
    };
    hair?: {
        bald: number;
        invisible: boolean;
        hairColor: Array<{
            color: 'black' | 'brown' | 'blond' | 'red' | 'gray' | 'white' | 'other';
            confidence: number;
        }>;
    };
    makeup?: {
        eyeMakeup: boolean;
        lipMakeup: boolean;
    };
    accessories?: Array<{
        type: 'headWear' | 'glasses' | 'mask';
        confidence: number;
    }>;
    occlusion?: {
        foreheadOccluded: boolean;
        eyeOccluded: boolean;
        mouthOccluded: boolean;
    };
    blur?: {
        blurLevel: 'Low' | 'Medium' | 'High';
        value: number;
    };
    exposure?: {
        exposureLevel: 'UnderExposure' | 'GoodExposure' | 'OverExposure';
        value: number;
    };
    noise?: {
        noiseLevel: 'Low' | 'Medium' | 'High';
        value: number;
    };
}

export interface Face {
    faceId: string,
    faceAttributes: FaceAttributes
}
