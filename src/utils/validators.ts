import _ from "lodash";
import { ObjectId } from "mongodb";

interface DataSchema{
  title:string,
  value: number,
  type: 'income' | 'expense',
  category: string,
}

export function isValid <T extends DataSchema>(data:T) {
  return _.isEqual(data, {
    title: data?.title,
    value: data?.value,
    type: data?.type,
    category: data?.category,
  })
}


export function isValidId(id:string) {
  return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
}