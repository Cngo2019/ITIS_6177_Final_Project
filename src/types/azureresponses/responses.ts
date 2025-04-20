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

export interface Tag {
    name: string;
    confidence: number;
}

export interface TagsResult {
    values: Tag[];
}

export interface ImageAnalysisResult {
    modelVersion: string;
    captionResult: CaptionResult;
    tagsResult: TagsResult;
    metadata: {
        width: number,
        height: number
    }
}
