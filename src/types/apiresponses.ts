export interface BoundingBox {
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface CaptionResult {
    text: string;
    confidence: number;
}

export interface DenseCaption {
    text: string;
    confidence: number;
    boundingBox: BoundingBox;
}

export interface DenseCaptionsResult {
    values: DenseCaption[];
}

export interface Tag {
    name: string;
    confidence: number;
}

export interface TagsResult {
    values: Tag[];
}

export interface Metadata {
    width: number;
    height: number;
}

export interface ReadResult {
    blocks: any[]; // Replace `any` with a defined Block interface if needed
}

export interface PersonDetection {
    boundingBox: BoundingBox;
    confidence: number;
}

export interface PeopleResult {
    values: PersonDetection[];
}

export interface ImageAnalysisResult {
    modelVersion: string;
    captionResult: CaptionResult;
    denseCaptionsResult: DenseCaptionsResult;
    metadata: Metadata;
    tagsResult: TagsResult;
    readResult: ReadResult;
}
