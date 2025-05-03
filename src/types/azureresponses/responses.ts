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
export interface ReadResult {
    blocks: Block[];
}

export interface Block {
    boundingPolygon: BoundingPolygon;
    spans: Span[];
    lines: Line[];
}

export interface BoundingPolygon {
    points: Point[];
}

export interface Point {
    x: number;
    y: number;
}

export interface Span {
    offset: number;
    length: number;
}

export interface Line {
    text: string;
    boundingPolygon: BoundingPolygon;
    words: Word[];
    spans: Span[];
}

export interface Word {
    text: string;
    boundingPolygon: BoundingPolygon;
    confidence: number;
    spans: Span[];
}
