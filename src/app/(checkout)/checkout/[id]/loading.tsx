export default function loading() {
  return (
    <div>
      <form className="">
        <div>
          <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
            <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
          </div>
          <div className="grid gap-10 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
            <div className="animate-pulse px-4 pt-8">
              <p className="text-xl font-medium">Order Details</p>
              <div className="mt-8 space-y-3 rounded-lg border bg-white p-6">
                <div className="flex rounded-md bg-gray-300 h-28"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
            <div className="animate-pulse mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Payment Details</p>
              <div className="mt-4 mb-4 h-6 bg-gray-300 rounded"></div>
              <div className="mt-6 border-t border-b py-4">
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="mt-6 h-6 bg-gray-300 rounded"></div>
              <div className="mt-4 h-12 bg-blue-300 rounded-md"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
