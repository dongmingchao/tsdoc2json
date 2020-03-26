import * as ts from 'typescript';
import * as tsdoc from '@microsoft/tsdoc';
export interface IFoundComment {
    compilerNode: ts.Node;
    textRange: tsdoc.TextRange;
}
export declare function getJSDocCommentRanges(node: ts.Node, text: string): ts.CommentRange[];
export declare function walkCompilerAstAndFindComments(node: ts.Node, indent: string, foundComments: IFoundComment[]): void;
export declare function obtainComments(comments: IFoundComment[]): void;
export declare function parseComment(shortComment: string): string | undefined;
