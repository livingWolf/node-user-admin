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
  update() {
    let conditions = menuParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' , ')
    let sql = `update sys_menu set ${conditions}`
    return sql
  }
  query() {
    let conditions = menuParams
      .filter(item1 => data[item1] !== undefined)
      .map(item => `${item}='${data[item]}'`)
      .join(' and ')
    let sql = `select ${menuParams.join(',')} from sys_menu ${
      conditions.length ? ' where ' + conditions : ''
    }`
    return sql
  }
}

export default new MenuModel()
