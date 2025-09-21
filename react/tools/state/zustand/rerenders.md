# Prevent rerenders with useShallow

When you need to subscribe to a computed state from a store, the recommended way is to use a selector.

The computed selector will cause a rerender if the output has changed according to Object.is.

In this case you might want to use useShallow to avoid a rerender if the computed value is always shallow equal the previous one.
