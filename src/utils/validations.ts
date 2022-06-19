import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const memoryValidation = yup.object().shape({
  name: yup.string().required('Name is required.'),
  story: yup
    .string()
    .required('Story is required.')
    .min(10, 'Care to elaborate?')
})

export const resolver = yupResolver(memoryValidation)
