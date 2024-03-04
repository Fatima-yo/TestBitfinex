# Test bitfinex order book

## Docs api bitfinex

MONTO   TOTAL   PRECIO
14.8553 17.7887 61,938.0000

For trading pair symbols (ex. tBTCUSD)

[0]	PRICE	float	Price level
[1]	COUNT	int	Number of orders at that price level
[2]	AMOUNT	float	Total amount available at that price level (if AMOUNT > 0 then bid else ask)


For funding currency symbols (ex. fUSD)

[0]	RATE	float	Rate level
[1]	PERIOD	int	Period level
[2]	COUNT	int	Number of orders at that price level
[3]	AMOUNT	float	Total amount available at that price level (if AMOUNT > 0 then ask else bid)


## Response
For trading pair symbols (ex. tBTCUSD)
Index	Field	Type	Description
[0]	ORDER_ID	int	Order ID
[1]	PRICE	float	Price level
[2]	AMOUNT	float	Total amount available at that price level (if AMOUNT > 0 then bid else ask)


For funding currency symbols (ex. fUSD)
Index	Field	Type	Description
[0]	OFFER_ID	int	Offer ID
[1]	PERIOD	int	Period level
[2]	RATE	float	Rate level
[3]	AMOUNT	float	Total amount available at that price level (if AMOUNT > 0 then ask else bid)

## Retrieve Orders
Gets all the current user's active orders.

Response Fields
Index	Field	Type	Description
[0]	ID	int	Order ID
[1]	GID	int	Group Order ID
[2]	CID	int	Client Order ID
[3]	SYMBOL	string	Trading pair (tBTCUSD, tLTCBTC, ...)
[4]	MTS_CREATE	int	Millisecond epoch timestamp of creation
[5]	MTS_UPDATE	int	Millisecond epoch timestamp of last update
[6]	AMOUNT	float	Positive means buy, negative means sell
[7]	AMOUNT_ORIG	float	Original amount (before any update)
[8]	ORDER_TYPE	string	The order's type (see list below)
[9]	TYPE_PREV	string	Previous order type (before the last update)
[10]	MTS_TIF	int	Millisecond epoch timestamp for TIF (Time-In-Force)
[12]	FLAGS	int	Sum of all active flags for the order (values can be found here)
[13]	STATUS	string	A complete overview on available order statuses can be found here

[16]	PRICE	float	Price
[17]	PRICE_AVG	float	Average price
[18]	PRICE_TRAILING	float	The trailing price
[19]	PRICE_AUX_LIMIT	float	Auxiliary Limit price (for STOP LIMIT)

[23]	NOTIFY	int	1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification
[24]	HIDDEN	int	1 if order must be hidden, 0 if order must not be hidden
[25]	PLACED_ID	int	If another order caused this order to be placed (OCO) this will be that other order's ID

[28]	ROUTING	string	Indicates origin of action: BFX, API>BFX

[31]	META	JSON	Additional meta information about the order ( $F7 = IS_POST_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff_code: "aff_code_here")

## Submit Order
Submits an order on a trading pair (e.g. BTCUSD, LTCBTC, ...).

Response Fields
This endpoint returns a notification.

Index	Field	Type	Description
[0]	MTS	int	Seconds epoch timestamp of notification
[1]	TYPE	string	Notification's type ("on-req")
[2]	MESSAGE_ID	int	Unique notification's ID
[ . . . ]
[4]	DATA	Order[]	An array containing only the new order
[5]	CODE	int	W.I.P. (work in progress)
[6]	STATUS	string	Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...)
[7]	TEXT	string	Additional notification description
Order objects
Index	Field	Type	Description
[0]	ID	int	Order ID
[1]	GID	int	Group Order ID
[2]	CID	int	Client Order ID
[3]	SYMBOL	string	Trading pair (tBTCUSD, tLTCETH, ...)
[4]	MTS_CREATE	int	Millisecond epoch timestamp of creation
[5]	MTS_UPDATE	int	Millisecond epoch timestamp of last update
[6]	AMOUNT	float	Positive means buy, negative means sell
[7]	AMOUNT_ORIG	float	Original amount (before any update)
[8]	ORDER_TYPE	string	The order's type (see list below)
[9]	TYPE_PREV	string	Previous order type (before the last update)
[10]	MTS_TIF	int	Millisecond epoch timestamp for TIF (Time-In-Force)
[ . . . ]
[12]	FLAGS	int	Sum of all active flags for the order (values can be found here)
[13]	STATUS	string	A complete overview on available order statuses can be found here
[ . . . ]
[16]	PRICE	float	Price
[17]	PRICE_AVG	float	Average price
[18]	PRICE_TRAILING	float	The trailing price
[19]	PRICE_AUX_LIMIT	float	Auxiliary Limit price (for STOP LIMIT)
[ . . . ]
[23]	NOTIFY	int	1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification
[24]	HIDDEN	int	1 if order must be hidden, 0 if order must not be hidden
[25]	PLACED_ID	int	If another order caused this order to be placed (OCO) this will be that other order's ID
[ . . . ]
[28]	ROUTING	string	Indicates origin of action: BFX, API>BFX
[ . . . ]
[31]	META	JSON	Additional meta information about the order ( $F7 = IS_POST_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff_code: "aff_code_here")

## Update Order

Updates an existing order, can be used to update margin, exchange, and derivative orders.

Response Fields
This endpoint returns a notification.

Index	Field	Type	Description
[0]	MTS	int	Milliseconds epoch timestamp of notification
[1]	TYPE	string	Notification's type ("ou-req")
[2]	MESSAGE_ID	int	Unique notification's ID
[ . . . ]
[4]	DATA	Order	The order that has been updated
[5]	CODE	int	W.I.P. (work in progress)
[6]	STATUS	string	Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...)
[7]	TEXT	string	Additional notification description
Order objects
Index	Field	Type	Description
[0]	ID	int	Order ID
[1]	GID	int	Group Order ID
[2]	CID	int	Client Order ID
[3]	SYMBOL	string	Trading pair (tBTCUSD, tLTCETH, ...)
[4]	MTS_CREATE	int	Millisecond epoch timestamp of creation
[5]	MTS_UPDATE	int	Millisecond epoch timestamp of last update
[6]	AMOUNT	float	Positive means buy, negative means sell
[7]	AMOUNT_ORIG	float	Original amount (before any update)
[8]	ORDER_TYPE	string	The order's type (see list below)
[9]	TYPE_PREV	string	Previous order type (before the last update)
[10]	MTS_TIF	int	Millisecond epoch timestamp for TIF (Time-In-Force)
[ . . . ]
[12]	FLAGS	int	Sum of all active flags for the order (values can be found here)
[13]	STATUS	string	A complete overview on available order statuses can be found here
[ . . . ]
[16]	PRICE	float	Price
[17]	PRICE_AVG	float	Average price
[18]	PRICE_TRAILING	float	The trailing price
[19]	PRICE_AUX_LIMIT	float	Auxiliary Limit price (for STOP LIMIT)
[ . . . ]
[23]	NOTIFY	int	1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification
[24]	HIDDEN	int	1 if order must be hidden, 0 if order must not be hidden
[25]	PLACED_ID	int	If another order caused this order to be placed (OCO) this will be that other order's ID
[ . . . ]
[28]	ROUTING	string	Indicates origin of action: BFX, API>BFX
[ . . . ]
[31]	META	JSON	Additional meta information about the order ( $F7 = IS_POST_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff_code: "aff_code_here")

## Cancel Order
Cancels one of the current user's orders.

Users can cancel their margin, exchange and derivative orders by providing their IDs.

Alternatively, users can cancel an order using its CID along with a date (YYYY-MM-DD).

Both the ID and CID of an order can be get through the Retrieve Orders and Retrieve Orders (by symbol) endpoints.

Response Fields
This endpoint returns a notification.

Index	Field	Type	Description
[0]	MTS	int	Milliseconds epoch timestamp of notification
[1]	TYPE	string	Notification's type ("oc-req")
[2]	MESSAGE_ID	int	Unique notification's ID
[ . . . ]
[4]	DATA	Order	The order that has been cancelled
[5]	CODE	int	W.I.P. (work in progress)
[6]	STATUS	string	Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...)
[7]	TEXT	string	Additional notification description
Order arrays
Index	Field	Type	Description
[0]	ID	int	Order ID
[1]	GID	int	Group Order ID
[2]	CID	int	Client Order ID
[3]	SYMBOL	string	Trading pair (tBTCUSD, tLTCETH, ...)
[4]	MTS_CREATE	int	Millisecond epoch timestamp of creation
[5]	MTS_UPDATE	int	Millisecond epoch timestamp of last update
[6]	AMOUNT	float	Positive means buy, negative means sell
[7]	AMOUNT_ORIG	float	Original amount (before any update)
[8]	ORDER_TYPE	string	The order's type (see list below)
[9]	TYPE_PREV	string	Previous order type (before the last update)
[10]	MTS_TIF	int	Millisecond epoch timestamp for TIF (Time-In-Force)
[ . . . ]
[12]	FLAGS	int	Sum of all active flags for the order (values can be found here)
[13]	STATUS	string	A complete overview on available order statuses can be found here
[ . . . ]
[16]	PRICE	float	Price
[17]	PRICE_AVG	float	Average price
[18]	PRICE_TRAILING	float	The trailing price
[19]	PRICE_AUX_LIMIT	float	Auxiliary Limit price (for STOP LIMIT)
[ . . . ]
[23]	NOTIFY	int	1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification
[24]	HIDDEN	int	1 if order must be hidden, 0 if order must not be hidden
[25]	PLACED_ID	int	If another order caused this order to be placed (OCO) this will be that other order's ID
[ . . . ]
[28]	ROUTING	string	Indicates origin of action: BFX, API>BFX
[ . . . ]
[31]	META	JSON	Additional meta information about the order ( $F7 = IS_POST_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff_code: "aff_code_here")


## Methods
### Create OrderBook
