import * as type from "./types";

export function tableResize(data) {
  return {
    type: type.TABLE__RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: type.CHANGE__TEXT,
    data
  }
}

export function updateDate() {
  return {
    type: type.UPDATE_DATE
  }
}

export function changeStyles(data) {
  return {
    type: type.CHANGE_STYLES,
    data
  }
}

export function applyStyle(data) {
  return {
    type: type.APPLY_STYLE,
    data
  }
}

export function changeTitle(data) {
  return {
    type: type.CHANGE__TITLE,
    data
  }
}