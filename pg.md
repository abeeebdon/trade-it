# Project Pages

**89 pages** across **4 route groups** — `(home)`, `(auth)`, `(dashboard)` (route groups do not appear in the URL) — plus a few root-level pages.

Layouts: `src/app/layout.tsx` (root) · `(home)/layout.tsx` · `(auth)/layout.tsx` · `(dashboard)/layout.tsx`

## Public / Storefront — `(home)` group (10)

| Route                    | Feature component                     |
| ------------------------ | ------------------------------------- |
| `/`                      | `landingPage` home                    |
| `/about`                 | about page                            |
| `/shop/products`         | product listing                       |
| `/shop/products/details` | product detail                        |
| `/shop/orders`           | shop orders                           |
| `/shop/orders/details`   | shop order detail                     |
| `/cart`                  | `features/consumer/cart` → `CartPage` |
| `/checkout`              | `features/payment` → `CheckoutPage`   |
| `/payment`               | `features/payment` → `PaymentPage`    |
| `/payment/success`       | `PaymentSuccessPage`                  |

## Authentication — `(auth)` group (5)

| Route              | Feature component                |
| ------------------ | -------------------------------- |
| `/login`           | `authentication/pages/Login`     |
| `/register`        | `authentication/pages/Register`  |
| `/forgot-password` | `authentication` forgot password |
| `/reset-password`  | `authentication` reset password  |
| `/mfa-auth`        | `authentication` MFA challenge   |

## Standalone root pages (4)

| Route           | Purpose                                                          |
| --------------- | ---------------------------------------------------------------- |
| `/getstarted`   | onboarding entry / role selection                                |
| `/wait-list`    | `features/waitlist` (branded landing + `WaitlistForm`)           |
| `/user`         | client redirect page based on auth/role (toasts + `router.push`) |
| `/unauthorized` | 403 page                                                         |

## Admin — `(dashboard)/admin` (23)

| Route                     | Feature component                                           |
| ------------------------- | ----------------------------------------------------------- |
| `/admin`                  | `admin` dashboard                                           |
| `/admin/users`            | user management                                             |
| `/admin/verifications`    | seller/account verifications                                |
| `/admin/management`       | admin management                                            |
| `/admin/waitlist`         | `admin-waitlist/AdminWaitlist`                              |
| `/admin/listings`         | `adminListing` → `AdminListings` (+ `ModerateListingModal`) |
| `/admin/products`         | admin products list                                         |
| `/admin/products/create`  | create product                                              |
| `/admin/products/edit`    | edit product (`?id=`)                                       |
| `/admin/products/details` | admin product details                                       |
| `/admin/product-details`  | shared `shops/ProductDetailsPage`                           |
| `/admin/orders`           | `adminOrders` → `AdminOrders`                               |
| `/admin/order-d`          | `orderD` → `OrderD` (Shopify-style orders table)            |
| `/admin/order-d/details`  | `orderD` → `OrderDDetails`                                  |
| `/admin/delivery`         | delivery management list                                    |
| `/admin/delivery/[id]`    | `DeliveryOrderDetail`                                       |
| `/admin/tracking_id`      | `tracking_id` → `TrackingIdPage`                            |
| `/admin/withdrawals`      | withdrawal requests                                         |
| `/admin/credit`           | credit management                                           |
| `/admin/categories`       | category management                                         |
| `/admin/disputes`         | disputes                                                    |
| `/admin/finance`          | finance overview                                            |
| `/admin/help`             | admin help                                                  |

## Buyer — `(dashboard)/buyer` (13)

| Route                     | Feature component                                            |
| ------------------------- | ------------------------------------------------------------ |
| `/buyer`                  | `buyer/pages/BuyerDashboard`                                 |
| `/buyer/orders`           | buyer orders                                                 |
| `/buyer/orders/details`   | buyer order detail                                           |
| `/buyer/orders-demo`      | `orderManagement` → `OrdersManagementList` (`role="vendor"`) |
| `/buyer/orders-demo/[id]` | `OrdersManagementDetail`                                     |
| `/buyer/sell`             | buyer inventory sell (`BuyerInventorySell`)                  |
| `/buyer/sell/details`     | `InventoryDetails`                                           |
| `/buyer/product-details`  | shared `shops/ProductDetailsPage`                            |
| `/buyer/fulfillment`      | fulfillment                                                  |
| `/buyer/finance`          | finance                                                      |
| `/buyer/finance/accounts` | financial accounts                                           |
| `/buyer/compliance`       | compliance                                                   |
| `/buyer/onboarding`       | buyer onboarding (stepper)                                   |

## Consumer — `(dashboard)/consumer` (12)

| Route                       | Feature component                           |
| --------------------------- | ------------------------------------------- |
| `/consumer`                 | consumer home/dashboard                     |
| `/consumer/orders`          | consumer orders                             |
| `/consumer/orders/details`  | order detail                                |
| `/consumer/lists`           | shopping lists                              |
| `/consumer/lists/details`   | `ListDetailsPage`                           |
| `/consumer/receipts`        | receipts                                    |
| `/consumer/quotes`          | quotes                                      |
| `/consumer/payment-methods` | payment methods (ACH / Zelle / card modals) |
| `/consumer/notifications`   | `NotificationPage`                          |
| `/consumer/addresses`       | addresses                                   |
| `/consumer/favourites`      | favourites                                  |
| `/consumer/help`            | help                                        |

## Exporter — `(dashboard)/exporter` (20)

| Route                                   | Feature component                    |
| --------------------------------------- | ------------------------------------ |
| `/exporter`                             | `exporter/pages` dashboard           |
| `/exporter/orders`                      | `exporter/orders/pages/Orders`       |
| `/exporter/orders/details`              | `OrderDetail` (`?id=`)               |
| `/exporter/products`                    | products list                        |
| `/exporter/products/create`             | `CreateProduct`                      |
| `/exporter/products/edit`               | `EditProductPage` (`?id=`)           |
| `/exporter/products/details`            | product details                      |
| `/exporter/product-details`             | shared `shops/ProductDetailsPage`    |
| `/exporter/sell`                        | sell flow                            |
| `/exporter/sell/details`                | sell details (`DTCDetailsCard`)      |
| `/exporter/fulfillment`                 | fulfillment list                     |
| `/exporter/fulfillment/details`         | `DeliveryOrderDetail`                |
| `/exporter/credit`                      | credit                               |
| `/exporter/credit/[id]`                 | credit detail                        |
| `/exporter/compliance`                  | compliance                           |
| `/exporter/repayment`                   | repayment                            |
| `/exporter/account`                     | account settings                     |
| `/exporter/account/withdrawal-accounts` | withdrawal accounts                  |
| `/exporter/onboarding`                  | onboarding stepper                   |
| `/exporter/testi`                       | placeholder test page — dev leftover |

## Profile — `(dashboard)/profile` (2)

| Route          | Feature component |
| -------------- | ----------------- |
| `/profile`     | `ProfilePage`     |
| `/profile/mfa` | MFA setup         |

## Non-page special files

- Root: `src/app/loading.tsx`, `src/app/not-found.tsx`, `src/app/loading/`
- `unauthorized/` (403), group-level loading states
- `src/proxy.ts` — route middleware (auth/role gating for the sections above)

## Totals

| Section                  | Pages  |
| ------------------------ | ------ |
| Home (public/storefront) | 10     |
| Auth                     | 5      |
| Admin                    | 23     |
| Buyer                    | 13     |
| Consumer                 | 12     |
| Exporter                 | 20     |
| Profile                  | 2      |
| Standalone root          | 4      |
| **Total**                | **89** |
