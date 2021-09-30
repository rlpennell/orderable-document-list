import S from '@sanity/desk-tool/structure-builder'
import {SortIcon, GenerateIcon} from '@sanity/icons'
import OrderableDocumentList from '../OrderableDocumentList'

export function orderableDocumentListDeskItem(config = {}) {
  if (!config?.type) {
    throw new Error(`
    "type" not defined in orderableDocumentListDeskItem parameters.
    \n\n
    Example: orderableDocumentListDeskItem({type: 'category'})
    `)
  }

  const {type, title, icon} = config

  const listTitle = title ?? `Orderable ${type}`
  const listId = `orderable-${type}`
  const listIcon = icon ?? SortIcon

  return S.listItem(type)
    .title(listTitle)
    .id(listId)
    .icon(listIcon)
    .child(
      // This appears to be the only way to have a custom component in a list AND have a "compose" button that works
      Object.assign(S.documentTypeList(type).serialize(), {
        type: 'component',
        component: OrderableDocumentList,
        options: {type},
        menuItems: [
          ...S.documentTypeList(type).menuItems().serialize().menuItems,
          S.menuItem().title(`Reset Order`).icon(GenerateIcon).action(`resetOrder`).serialize(),
          S.menuItem().title(`Show Increments`).icon(SortIcon).action(`showIncrements`).serialize(),
        ],
      })
    )
    .serialize()
}
