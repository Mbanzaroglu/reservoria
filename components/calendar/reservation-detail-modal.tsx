"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/hooks/use-toast"
import { constants } from "@/lib/config"
import type { CalendarReservation } from "@/lib/queries/calendar-queries"
import { useFacilities, useRooms } from "@/lib/queries/calendar-queries"
import { parseISO } from "date-fns"

interface ReservationDetailModalProps {
  reservation: CalendarReservation | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Format currency for display
 */
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: constants.DEFAULT_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Reservation detail modal component
 */
export function ReservationDetailModal({
  reservation,
  open,
  onOpenChange,
}: ReservationDetailModalProps) {
  const { toast } = useToast()
  const { data: facilities } = useFacilities()
  const { data: rooms } = useRooms(reservation?.facilityId)

  const [formData, setFormData] = useState({
    facilityId: "",
    roomId: "",
    guestName: "",
    adultCount: 0,
    childCount: 0,
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    totalPrice: 0,
    source: "",
    status: "pending" as "confirmed" | "pending" | "cancelled",
  })

  // Update form data when reservation changes
  useEffect(() => {
    if (reservation) {
      setFormData({
        facilityId: reservation.facilityId,
        roomId: reservation.roomId,
        guestName: reservation.guestName,
        adultCount: reservation.adultCount,
        childCount: reservation.childCount,
        checkIn: parseISO(reservation.checkIn),
        checkOut: parseISO(reservation.checkOut),
        totalPrice: reservation.totalPrice,
        source: reservation.source,
        status: reservation.status,
      })
    }
  }, [reservation])

  const handleEdit = () => {
    toast({
      title: "Düzenleme",
      description: "Rezervasyon düzenleme özelliği yakında eklenecek.",
    })
  }

  const handleDelete = () => {
    toast({
      title: "Silme",
      description: "Rezervasyon silme özelliği yakında eklenecek.",
      variant: "destructive",
    })
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  if (!reservation) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rezervasyon Görüntüle</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Facility */}
          <div className="space-y-2">
            <Label htmlFor="facility">Tesis</Label>
            <Select value={formData.facilityId} disabled>
              <SelectTrigger id="facility">
                <SelectValue placeholder="Tesis seçin" />
              </SelectTrigger>
              <SelectContent>
                {facilities?.map((facility) => (
                  <SelectItem key={facility.id} value={facility.id}>
                    {facility.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Room */}
          <div className="space-y-2">
            <Label htmlFor="room">Oda</Label>
            <Select value={formData.roomId} disabled>
              <SelectTrigger id="room">
                <SelectValue placeholder="Oda seçin" />
              </SelectTrigger>
              <SelectContent>
                {rooms?.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Guest Name */}
          <div className="space-y-2">
            <Label htmlFor="guestName">Misafir Adı</Label>
            <Input
              id="guestName"
              value={formData.guestName}
              disabled
            />
          </div>

          {/* Adult and Child Count */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adultCount">Yetişkin Sayısı</Label>
              <Input
                id="adultCount"
                type="number"
                value={formData.adultCount}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="childCount">Çocuk Sayısı</Label>
              <Input
                id="childCount"
                type="number"
                value={formData.childCount}
                disabled
              />
            </div>
          </div>

          {/* Check In and Check Out */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Başlangıç Tarihi</Label>
              <DatePicker
                date={formData.checkIn}
                onDateChange={() => {}}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Bitiş Tarihi</Label>
              <DatePicker
                date={formData.checkOut}
                onDateChange={() => {}}
                disabled
              />
            </div>
          </div>

          {/* Total Price and Source */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalPrice">Toplam Fiyat</Label>
              <Input
                id="totalPrice"
                value={formatCurrency(formData.totalPrice)}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Kaynak</Label>
              <Select value={formData.source} disabled>
                <SelectTrigger id="source">
                  <SelectValue placeholder="Kaynak seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Airbnb">Airbnb</SelectItem>
                  <SelectItem value="Booking.com">Booking.com</SelectItem>
                  <SelectItem value="Direct">Direct</SelectItem>
                  <SelectItem value="Other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Durum</Label>
            <Select value={formData.status} disabled>
              <SelectTrigger id="status">
                <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="confirmed">Onaylandı</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="cancelled">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleEdit}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Düzenle
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
          >
            Sil
          </Button>
          <Button
            onClick={handleClose}
            variant="outline"
          >
            Kapat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

