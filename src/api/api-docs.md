# API文档

## 菜篮子管理 (/basket)

| 方法 | 路径 | 描述 | 参数 | 响应 |
|------|------|------|------|------|
| GET | /basket/getBasketItems | 获取菜篮子列表 | 无 | Result<List<BasketVO>> |
| POST | /basket/addToBasket | 添加食材到菜篮子 | Body: BasketDTO | Result<Long> |
| DELETE | /basket/{ingredientId} | 从菜篮子移除食材 | Path: ingredientId | Result<Boolean> |

## 食材管理 (/ingredients)

| 方法 | 路径 | 描述 | 参数 | 响应 |
|------|------|------|------|------|
| GET | /ingredients/getIngredients | 获取食材列表 | 无 | Result<List<IngredientVO>> |
| POST | /ingredients/addIngredient | 添加食材 | Body: IngredientDTO | Result<Long> |
| DELETE | /ingredients/{id} | 删除食材 | Path: id | Result<Boolean> |

## 餐单管理 (/menus)

| 方法 | 路径 | 描述 | 参数 | 响应 |
|------|------|------|------|------|
| POST | /menus/image/initialize | 初始化菜单图片上传 | Query: userId, fileName | Result<String> (uploadId) |
| POST | /menus/image/chunk | 上传菜单图片分片 | Query: uploadId, chunkNumber; File: chunkFile | Result<Void> |
| POST | /menus/image/complete | 完成菜单图片上传 | Query: uploadId, thumbnailWidth, thumbnailHeight | Result<Map<String, String>> (urls) |
| POST | /menus | 上传餐单 | Body: MenuDTO | Result<Long> (menuId) |
| POST | /menus/batch | 批量上传餐单 | Body: List<MenuDTO> | Result<List<Long>> (menuIds) |
| GET | /menus/category/{categoryId} | 按分类浏览餐单 | Path: categoryId; Query: pageNum, pageSize | Result<IPage<MenuVO>> |
| GET | /menus/hot | 按热门程度浏览餐单 | Query: pageNum, pageSize | Result<IPage<MenuVO>> |
| GET | /menus/newest | 按最新上传浏览餐单 | Query: pageNum, pageSize | Result<IPage<MenuVO>> |
| GET | /menus/search | 搜索餐单 | Query: keyword, pageNum, pageSize | Result<IPage<MenuVO>> |
| GET | /menus/{id} | 获取餐单详情 | Path: id | Result<MenuDetailVO> |
| POST | /menus/{id}/collect | 收藏餐单 | Path: id | Result<Boolean> |

## 订单管理 (/orders)

| 方法 | 路径 | 描述 | 参数 | 响应 |
|------|------|------|------|------|
| GET | /orders/getOrders | 获取订单列表 | 无 | Result<List<OrderVO>> |
| POST | /orders/createOrder | 创建订单 | Body: OrderDTO | Result<Long> (orderId) |
| GET | /orders/{id} | 获取订单详情 | Path: id | Result<OrderVO> |

## 计划管理 (/plans)

| 方法 | 路径 | 描述 | 参数 | 响应 |
|------|------|------|------|------|
| GET | /plans/listPlans | 获取计划列表 | 无 | Result<List<Plan>> |
| POST | /plans/createPlan | 创建新计划 | Body: Plan | Result<String> |
| PUT | /plans/{id} | 更新计划 | Path: id; Body: Plan | Result<String> |
| DELETE | /plans/{id} | 删除计划 | Path: id | Result<String> |

## 用户管理 (/user)

| 方法 | 路径 | 描述 | 参数 | 响应 |
|------|------|------|------|------|
| POST | /user/wechatLogin | 微信小程序登录 | Query: code | LoginVO |
| POST | /user/phoneLogin | 手机号登录 | Query: encryptedData, iv, userId | LoginVO |
| POST | /user/updateUsername | 更新用户名称 | Query: userId, username | boolean |
| POST | /user/avatar/initialize | 初始化头像上传 | Query: userId, fileName | String (uploadId) |
| POST | /user/avatar/chunk | 上传头像分片 | Query: uploadId, chunkNumber; File: chunkFile | void |
| POST | /user/avatar/complete | 完成头像上传 | Query: uploadId | String (avatarUrl) |