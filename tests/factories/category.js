import faker from 'faker';
import db from '../../models';

const data = async (props = {}) => {
  const defaultProps = {
    name: faker.name.firstName(),
  };
  return Object.assign({}, defaultProps, props);
};

export default async (props = {}) =>
  db.category.create(await data(props));
