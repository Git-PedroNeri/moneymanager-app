import { Injectable } from "@angular/core";
import { SelectItem, TreeNode, SelectItemGroup } from "primeng/api";

/**
 * An utility service.
 */

@Injectable()
export class ConvertUtil {
  static converterParaDropDownObjeto(
    lista: any[],
    label,
    classe,
    textoPadrao?: string
  ) {
    const items: SelectItem[] = [];
    if (textoPadrao) {
      items.push({ label: textoPadrao, value: null });
    }

    lista.forEach((item) => {
      items.push({
        label: item[label],
        value: item,
      });
    });
    return items;
  }

  static converterParaDropDownObjetoConcat(
    lista: any[],
    codigo,
    label,
    classe,
    textoPadrao?: string
  ) {
    const items: SelectItem[] = [];
    if (textoPadrao) {
      items.push({ label: textoPadrao, value: null });
    }

    lista.forEach((item) => {
      items.push({
        label: item[codigo].concat(" - ", item[label]),
        value: item,
      });
    });
    return items;
  }

  static converterParaDropDownObjetoGroup(
    lista: any[],
    groupBy: string,
    label: string,
    textoPadrao?: string
  ) {
    const itemGroup: SelectItemGroup[] = [];

    if (textoPadrao) {
      itemGroup.push({ label: textoPadrao, items: null });
    }

    const distinctGroup = lista
      .map((item) => item[groupBy])
      .filter((value, index, self) => self.indexOf(value) === index);

    distinctGroup.forEach((groupLabel) => {
      const items: SelectItem[] = [];

      lista
        .filter((item) => item[groupBy] === groupLabel)
        .forEach((item) => {
          items.push({
            label: item[label],
            value: item,
          });
        });

      itemGroup.push({ label: groupLabel, items: items });
    });
    return itemGroup;
  }

  // static converterParaDropDownObjectId(lista: any[], label, _ClasseValue, textoPadrao?: string) {
  //     const items: SelectItem[] = [];
  //     if (textoPadrao) {
  //         items.push({ label: textoPadrao, value: null });
  //     }

  //     lista.forEach(item => {
  //         items.push({
  //             label: item[label], value: new _ClasseValue(item.id)
  //         });
  //     });
  //     return items;
  // }

  static converterParaDropDown(
    lista: any[],
    label,
    value,
    textoPadrao?: string
  ) {
    const items: SelectItem[] = [];
    if (textoPadrao) {
      items.push({ label: textoPadrao, value: null });
    }

    lista.forEach((item) => {
      items.push({
        label: item[label],
        value: item[value],
      });
    });
    return items;
  }

  static converterParaDropDownConcat(
    lista: any[],
    codigo,
    descricao,
    id,
    textoPadrao?: string
  ) {
    const items: SelectItem[] = [];
    if (textoPadrao) {
      items.push({ label: textoPadrao, value: null });
    }

    lista.forEach((item) => {
      items.push({
        label: item[codigo].concat(" - ", item[descricao]),
        value: item[id],
      });
    });
    return items;
  }

  static converterParaMultiSelect(
    lista: any[],
    nomeCampo,
    valorCampo?: string
  ) {
    const items: SelectItem[] = [];

    lista.forEach((item) => {
      items.push({
        label: item[nomeCampo],
        value: item,
      });
    });
    return items;
  }
}
