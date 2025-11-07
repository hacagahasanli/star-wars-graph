import HttpMethods from '~/resources/constants/HttpMethods'

const MockAdapterMethods = {
  [HttpMethods.GET]: 'onGet',
  [HttpMethods.PUT]: 'onPut',
  [HttpMethods.POST]: 'onPost',
  [HttpMethods.PATCH]: 'onPatch',
  [HttpMethods.DELETE]: 'onDelete'
}

export default MockAdapterMethods
