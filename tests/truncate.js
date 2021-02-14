import db from '../models';

// TODO make this more dynamic
export default async function truncate() {
  return Promise.all([
    db.user.destroy({ where: {}, force: true }),
    db.role.destroy({ where: {}, force: true }),
    db.item.destroy({ where: {}, force: true }),
    db.category.destroy({ where: {}, force: true }),
  ]);
}
