import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IAlphaSchema {
    symbolList: string[];
    window: number,
    nodes: string[],
    setupOPs: any[],
    predictOPs: any[],
    updateOPs: any[],
    operandsValues: any,
    name?: string,
}

interface alphaModelInterface extends mongoose.Model<AlphaDoc> {
    build(attr: IAlphaSchema): AlphaDoc
}

interface AlphaDoc extends mongoose.Document {
    symbolList: string[];
    window: number,
    nodes: string[],
    setupOPs: any[],
    predictOPs: any[],
    updateOPs: any[],
    operandsValues: any,
    name?: string,
}

const alphaSchema = new Schema({
    symbolList: [String],
    window: Number,
    nodes: [String],
    setupOPs: [Schema.Types.Mixed],
    predictOPs: [Schema.Types.Mixed],
    updateOPs: [Schema.Types.Mixed],
    operandsValues: Schema.Types.Mixed,
    name: String
})

alphaSchema.statics.build = (attr: IAlphaSchema) => {
    return new Alpha(attr)
}

const Alpha = mongoose.model<AlphaDoc, alphaModelInterface>('Alpha', alphaSchema)

export default Alpha;