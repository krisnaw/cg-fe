import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

export type InvoiceParty = {
  name: string
  company?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  region?: string
  postalCode?: string
  country?: string
  email?: string
  phone?: string
}

export type InvoiceItem = {
  id?: string
  description: string
  quantity: number
  unitPrice: number
  notes?: string
}

export type InvoiceDocumentProps = {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  company: InvoiceParty & {
    logoUrl?: string
    taxId?: string
  }
  billTo: InvoiceParty
  items: InvoiceItem[]
  currency?: string
  taxRate?: number
  notes?: string
  footerNote?: string
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1f2937",
    lineHeight: 1.5,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  identity: {
    flexDirection: "column",
  },
  logo: {
    width: 96,
    height: 32,
    objectFit: "contain",
  },
  headline: {
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: 1.5,
  },
  meta: {
    alignItems: "flex-end",
  },
  metaItem: {
    marginTop: 6,
  },
  badge: {
    fontSize: 10,
    fontWeight: 600,
    color: "#1d4ed8",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  label: {
    fontSize: 9,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  value: {
    fontSize: 11,
    fontWeight: 600,
  },
  section: {
    marginBottom: 24,
  },
  partyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  party: {
    width: "48%",
  },
  partyTitle: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 6,
  },
  muted: {
    color: "#6b7280",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderStyle: "solid",
    borderRadius: 6,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  tableHeader: {
    backgroundColor: "#f3f4f6",
  },
  tableHeaderCell: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 9,
    fontWeight: 600,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  tableCell: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    borderTopStyle: "solid",
  },
  descriptionCol: {
    flex: 2.4,
  },
  quantityCol: {
    flex: 0.8,
    textAlign: "right",
  },
  priceCol: {
    flex: 1,
    textAlign: "right",
  },
  summary: {
    marginTop: 12,
    marginLeft: "auto",
    width: 200,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
    marginBottom: 6,
  },
  summaryLabel: {
    color: "#6b7280",
  },
  summaryValue: {
    fontWeight: 600,
  },
  notes: {
    marginTop: 24,
    padding: 12,
    borderRadius: 6,
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: "#f9fafb",
    fontSize: 10,
    color: "#4b5563",
  },
  footer: {
    marginTop: 48,
    fontSize: 9,
    textAlign: "center",
    color: "#9ca3af",
  },
})

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value)

const renderParty = (title: string, party: InvoiceParty) => (
  <View style={styles.party}>
    <Text style={styles.partyTitle}>{title}</Text>
    <Text style={{ marginBottom: 2 }}>{party.name}</Text>
    {party.company ? <Text style={{ marginBottom: 2 }}>{party.company}</Text> : null}
    {party.addressLine1 ? <Text style={{ marginBottom: 2 }}>{party.addressLine1}</Text> : null}
    {party.addressLine2 ? <Text style={{ marginBottom: 2 }}>{party.addressLine2}</Text> : null}
    {(party.city || party.region || party.postalCode) ? (
      <Text style={{ marginBottom: 2 }}>
        {[party.city, party.region, party.postalCode].filter(Boolean).join(", ")}
      </Text>
    ) : null}
    {party.country ? <Text style={{ marginBottom: 2 }}>{party.country}</Text> : null}
    {party.email ? (
      <Text style={[styles.muted, { marginBottom: 2 }]}>{party.email}</Text>
    ) : null}
    {party.phone ? (
      <Text style={styles.muted}>{party.phone}</Text>
    ) : null}
  </View>
)

export function InvoiceDocument({
  invoiceNumber,
  issueDate,
  dueDate,
  company,
  billTo,
  items,
  currency = "USD",
  taxRate,
  notes,
  footerNote,
}: InvoiceDocumentProps) {
  const hasItems = items.length > 0
  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0,
  )
  const taxAmount = taxRate ? subtotal * taxRate : 0
  const total = subtotal + taxAmount

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.identity}>
            {company.logoUrl ? (
              <Image src={company.logoUrl} style={styles.logo} />
            ) : (
              <Text style={styles.headline}>{company.name}</Text>
            )}
            {company.taxId ? (
              <Text style={[styles.muted, { marginTop: 6 }]}>Tax ID: {company.taxId}</Text>
            ) : null}
          </View>
          <View style={styles.meta}>
            <Text style={styles.badge}>Invoice</Text>
            <View style={styles.metaItem}>
              <Text style={styles.label}>Invoice Number</Text>
              <Text style={styles.value}>{invoiceNumber}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.label}>Date Issued</Text>
              <Text style={styles.value}>{issueDate}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.label}>Due Date</Text>
              <Text style={styles.value}>{dueDate}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.partyRow]}>
          {renderParty("From", company)}
          {renderParty("Bill To", billTo)}
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableHeaderCell, styles.descriptionCol]}>Description</Text>
              <Text style={[styles.tableHeaderCell, styles.quantityCol]}>Qty</Text>
              <Text style={[styles.tableHeaderCell, styles.priceCol]}>Rate</Text>
              <Text style={[styles.tableHeaderCell, styles.priceCol]}>Amount</Text>
            </View>
            {hasItems ? (
              items.map((item, index) => {
                const lineTotal = item.quantity * item.unitPrice
                return (
                  <View key={item.id ?? `${item.description}-${index}`} style={styles.tableRow}>
                    <View style={[styles.tableCell, styles.descriptionCol]}>
                      <Text>{item.description}</Text>
                      {item.notes ? (
                        <Text style={[styles.muted, { marginTop: 2 }]}>{item.notes}</Text>
                      ) : null}
                    </View>
                    <Text style={[styles.tableCell, styles.quantityCol]}>{item.quantity}</Text>
                    <Text style={[styles.tableCell, styles.priceCol]}>
                      {formatCurrency(item.unitPrice, currency)}
                    </Text>
                    <Text style={[styles.tableCell, styles.priceCol]}>
                      {formatCurrency(lineTotal, currency)}
                    </Text>
                  </View>
                )
              })
            ) : (
              <View style={styles.tableRow}>
                <View style={[styles.tableCell, styles.descriptionCol]}>
                  <Text>No line items added</Text>
                </View>
                <Text style={[styles.tableCell, styles.quantityCol]}>-</Text>
                <Text style={[styles.tableCell, styles.priceCol]}>-</Text>
                <Text style={[styles.tableCell, styles.priceCol]}>-</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatCurrency(subtotal, currency)}</Text>
          </View>
          {taxRate ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Tax ({(taxRate * 100).toFixed(1).replace(/\.0$/, "")}%)
              </Text>
              <Text style={styles.summaryValue}>{formatCurrency(taxAmount, currency)}</Text>
            </View>
          ) : null}
          <View style={[styles.summaryRow, { marginBottom: 0 }]}>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.summaryValue}>{formatCurrency(total, currency)}</Text>
          </View>
        </View>

        {notes ? (
          <View style={styles.notes}>
            <Text style={{ fontWeight: 600, marginBottom: 4 }}>Additional Notes</Text>
            <Text>{notes}</Text>
          </View>
        ) : null}

        {footerNote ? <Text style={styles.footer}>{footerNote}</Text> : null}
      </Page>
    </Document>
  )
}

export type InvoiceDocumentData = InvoiceDocumentProps
