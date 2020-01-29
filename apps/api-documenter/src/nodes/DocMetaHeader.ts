import {
    IDocNodeParameters,
    DocNode
  } from '@microsoft/tsdoc';
  import { CustomDocNodeKind } from './CustomDocNodeKind';
import { IndentedWriter } from '../utils/IndentedWriter';
 
  export interface IDocMetaHeader extends IDocNodeParameters {
    title: string;
    type?: string;
    keywords?: string[];
  }
  
  export class DocMetaHeader extends DocNode {
    public readonly title: string;
    public readonly type: string;
    public readonly keywords: string[];
  
    private readonly tag: string = '+++';

    public constructor(parameters: IDocMetaHeader) {
      super(parameters);
      this.title = parameters.title;
      this.type = parameters.type || 'docs';
      this.keywords = parameters.keywords || [];
    }
  
    /** @override */
    public get kind(): string {
      return CustomDocNodeKind.MetaHeader;
    }

    public writeTo(writer: IndentedWriter): void {
        const keywords = this.keywords
          .map(kw => `"${kw}"`).join(',');

        writer.writeLine(this.tag);
        writer.writeLine(`title = "${this.title}"`);
        writer.writeLine(`keywords = [${keywords}]`);
        writer.writeLine(`type = "${this.type}"`);
        writer.writeLine(this.tag);
    }
  }
  