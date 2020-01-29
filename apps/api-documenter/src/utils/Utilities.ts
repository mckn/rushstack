// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import {
  ApiParameterListMixin,
  ApiItem,
  ApiItemKind
} from '@microsoft/api-extractor-model';

export class Utilities {
  private static readonly _badFilenameCharsRegExp: RegExp = /[^a-z0-9_\-\.]/ig;
  
  public static getImportName(name: string) {
    return name.replace(Utilities._badFilenameCharsRegExp, '');
  }
  /**
   * Generates a concise signature for a function.  Example: "getArea(width, height)"
   */
  public static getConciseSignature(apiItem: ApiItem): string {
    let displayName = apiItem.displayName;

    if (apiItem.kind === ApiItemKind.ConstructSignature || apiItem.kind === ApiItemKind.Constructor) {
      displayName = displayName.replace(Utilities._badFilenameCharsRegExp, '');
    }

    if (ApiParameterListMixin.isBaseClassOf(apiItem)) {
      return displayName + '(' + apiItem.parameters.map(x => x.name).join(', ') + ')';
    }
    return displayName;
  }

  /**
   * Converts bad filename characters to underscores.
   */
  public static getSafeFilenameForName(name: string): string {
    // TODO: This can introduce naming collisions.
    // We will fix that as part of https://github.com/microsoft/rushstack/issues/1308
    return name.replace(Utilities._badFilenameCharsRegExp, '_').toLowerCase();
  }
}
