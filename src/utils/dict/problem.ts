import isArray from 'lodash-es/isArray'
export const answerType = [
  {
    label: '单选题',
    value: 'radio',
  },
  {
    label: '多选题',
    value: 'checkbox',
  },
  {
    label: '判断题',
    value: 'boolean',
  },
  {
    label: '填空题',
    value: 'input',
  },
]

export const answerIndex = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

export const getIndexStr = (data: any) => {
  if (isArray(data)) {
    return data
      .map((item, index) => {
        return answerIndex[item]
      })
      .join(',')
  } else {
    return answerIndex[data]
  }
}
