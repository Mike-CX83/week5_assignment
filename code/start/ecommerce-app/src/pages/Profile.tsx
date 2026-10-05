import { useState, type FormEvent } from 'react'
import OrderHistory from '../components/OrderHistory'
import { useUserStore } from '../stores/useUserStore'

export default function Profile() {
  const profile = useUserStore((state) => state.profile)
  const addresses = useUserStore((state) => state.addresses)
  const updateProfile = useUserStore((state) => state.updateProfile)
  const addAddress = useUserStore((state) => state.addAddress)
  const [saved, setSaved] = useState(false)

  function onSaveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    updateProfile({
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
    })
    setSaved(true)
  }

  function onAddAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    addAddress({
      line1: String(form.get('line1') ?? ''),
      city: String(form.get('city') ?? ''),
      state: String(form.get('state') ?? ''),
      zip: String(form.get('zip') ?? ''),
    })
    event.currentTarget.reset()
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Profile</h1>

      <form onSubmit={onSaveProfile} className="max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Account details</h2>
        <div>
          <label htmlFor="profile-name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="profile-name"
            name="name"
            defaultValue={profile.name}
            required
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="profile-email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="profile-email"
            name="email"
            type="email"
            defaultValue={profile.email}
            required
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>
        <button type="submit" className="rounded bg-secondary px-4 py-2 text-white">
          Save profile
        </button>
        {saved ? <p>Profile saved.</p> : null}
      </form>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Addresses</h2>
        <ul aria-label="Saved addresses" className="space-y-2">
          {addresses.map((address) => (
            <li key={address.id}>
              {address.line1}, {address.city}, {address.state} {address.zip}
            </li>
          ))}
        </ul>
        <form onSubmit={onAddAddress} className="grid max-w-md gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="address-line1" className="block text-sm font-medium">
              Street
            </label>
            <input
              id="address-line1"
              name="line1"
              required
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="address-city" className="block text-sm font-medium">
              City
            </label>
            <input
              id="address-city"
              name="city"
              required
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="address-state" className="block text-sm font-medium">
              State
            </label>
            <input
              id="address-state"
              name="state"
              required
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="address-zip" className="block text-sm font-medium">
              ZIP
            </label>
            <input
              id="address-zip"
              name="zip"
              required
              className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-secondary px-4 py-2 text-white sm:col-span-2 sm:w-fit"
          >
            Add address
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Order history</h2>
        <OrderHistory />
      </section>
    </div>
  )
}
