import faker from 'faker';
import db from '../../models';
import categoryFactory from "./category"

const data = async (props = {}) => {
  const category = await categoryFactory();
  const defaultProps = {
    name: faker.name.firstName(),
    CategoryId: category.id,
    description: faker.lorem.words(5),
    price: faker.random.number(3),
    quantity: faker.random.number(3)
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  db.item.create(await data(props));