const menuParams = [
  'menuId',
  'parentId',
  'menuName',
  'menuIcon',
  'menuUrl',
  'menuType',
  'menuOrder',
  'menuStatus'
]
class MenuModel {
  add(data) {
    let conditions = menuParams
      .filter(item1 => data[item1] !== undefined && item1 !== 'menuId')
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `insert into sys_menu set ${conditions}`
    return sql
  }
  update(data) {
    let conditions = menuParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `update sys_menu set ${conditions} where menuId = '${data.menuId}' and delete_flag=0`
    return sql
  }
  delete(data) {
    let sql = `update sys_menu set delete_flag=1 where menuId = '${data.menuId}'`
    return sql
  }
  query(data) {
    let conditions = menuParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' and ')
    let sql = `select ${menuParams.join(',')} from sys_menu where delete_flag=0 ${
      conditions.length ? ' and ' + conditions : ''
    }`
    return sql
  }
}

export default new MenuModel()
