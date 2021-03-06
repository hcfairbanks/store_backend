import faker from 'faker';
import db from '../../models';

const data = async (props = {}) => {
  const defaultProps = {
    name: faker.name.firstName(),
  };
  return { ...defaultProps, ...props };
};

export default async (props = {}) => db.category.create(await data(props));
