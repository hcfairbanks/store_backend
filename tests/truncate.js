import db from '../models';


// TODO make this more dynamic
export default async function truncate() {
  return await Promise.all([
    await db.user.destroy({ where: {}, force: true }),
    await db.role.destroy({ where: {}, force: true }),
    await db.item.destroy({ where: {}, force: true }),
    await db.category.destroy({ where: {}, force: true })
  ]);
}