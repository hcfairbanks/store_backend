import faker from 'faker';
import db from '../../models';
import categoryFactory from "./category"

const data = async (props = {}) => {
  const category = await categoryFactory();
  const defaultProps = {
    name: faker.name.firstName(),
    CategoryId: category.id,
    description: faker.lorem.text(3),
    price: faker.random.number(50),
    quantity: faker.random.number(50)
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  db.item.create(await data(props));