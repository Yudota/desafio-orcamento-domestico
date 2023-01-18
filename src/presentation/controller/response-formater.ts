export interface ResponseFormatter {
  data: any,
  success: boolean
}
const responseFormater = (payload: any, success: boolean) => ({ data: payload, success } as ResponseFormatter);
export default responseFormater 